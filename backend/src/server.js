import "dotenv/config";

import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { connectDB } from "./config/db.js";
import { getJwtSecret } from "./middleware/auth.js";
import { ensureDefaultAdmin } from "./models/AdminUser.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { Product } from "./models/Product.js";
import { GalleryItem } from "./models/GalleryItem.js";
import {
  SEED_GALLERY_ITEMS,
  SEED_MANUFACTURED_PRODUCTS,
  SEED_SUPERMARKET_PRODUCTS,
} from "./data/seedData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === "production";
const defaultOrigins = [
  "https://subani.in",
  "https://www.subani.in",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:3000",
];
const envOrigins = (
  process.env.CORS_ORIGINS ||
  process.env.CLIENT_URL ||
  ""
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = new Set([...defaultOrigins, ...envOrigins]);

const isOriginAllowed = (origin) => {
  if (!origin) return true;
  if (allowedOrigins.has(origin)) return true;
  // Allow localhost / 127.0.0.1 on any port during development
  if (!isProduction && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
    return true;
  }
  return false;
};

const app = express();

// Connect to Database
await connectDB();
await ensureDefaultAdmin();

// Middleware
app.disable("x-powered-by");
app.use(
  cors({
    origin(origin, callback) {
      if (isOriginAllowed(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use((req, res, next) => {
  if (isProduction) {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  }
  next();
});

// Serve uploaded files statically from backend/uploads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "Subani & Koolath Backend API",
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/upload", uploadRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("[ServerError]", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`[Server] Subani API listening on http://localhost:${PORT}`);
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(
      `\n[Server Error] Port ${PORT} is already in use by another running process.`,
    );
    console.error(
      `Please terminate the process on port ${PORT} or configure a different PORT in .env.\n`,
    );
  } else {
    console.error("[Server Error]", error);
  }
  process.exit(1);
});

export default app;
