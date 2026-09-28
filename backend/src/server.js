import dotenv from "dotenv";
dotenv.config();

import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { connectDB } from "./config/db.js";
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
const allowedOrigins = (
  process.env.CORS_ORIGINS ||
    process.env.CLIENT_URL ||
    "https://subani.in,https://www.subani.in"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const JWT_SECRET = process.env.JWT_SECRET || "change_me_in_production";

const app = express();

// Connect to Database
await connectDB();

// Middleware
app.disable("x-powered-by");
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));
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

app.post("/api/auth/login", (req, res) => {
  const username = String(req.body?.username ?? "").trim();
  const password = String(req.body?.password ?? "");
  const validUsername = process.env.ADMIN_USERNAME || "";
  const validPassword = process.env.ADMIN_PASSWORD || "";

  if (!validUsername || !validPassword) {
    return res.status(500).json({
      success: false,
      message: "Admin credentials are not configured.",
    });
  }

  if (username !== validUsername || password !== validPassword) {
    return res.status(401).json({
      success: false,
      message: "Invalid username or password",
    });
  }

  const token = jwt.sign({ username: validUsername }, JWT_SECRET, {
    expiresIn: "8h",
  });

  return res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    user: { username: validUsername },
  });
});

// Quick seed route (re-populates db on demand)
app.post("/api/seed", async (req, res) => {
  if (isProduction) {
    return res.status(403).json({
      success: false,
      message: "Seeding is disabled in production.",
    });
  }

  try {
    await Product.deleteMany({});
    await GalleryItem.deleteMany({});
    await GalleryItem.insertMany(SEED_GALLERY_ITEMS);
    await Product.insertMany([
      ...SEED_MANUFACTURED_PRODUCTS,
      ...SEED_SUPERMARKET_PRODUCTS,
    ]);
    res.status(200).json({
      success: true,
      message:
        "Database seeded successfully with initial products and gallery items.",
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Mount Routes
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
