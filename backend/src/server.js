import dotenv from "dotenv";
dotenv.config();

import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
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

const app = express();

// Connect to Database
await connectDB();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

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

// Quick seed route (re-populates db on demand)
app.post("/api/seed", async (req, res) => {
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
