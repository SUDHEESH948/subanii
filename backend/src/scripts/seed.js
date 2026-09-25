import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import { Product } from "../models/Product.js";
import { GalleryItem } from "../models/GalleryItem.js";
import {
  SEED_GALLERY_ITEMS,
  SEED_MANUFACTURED_PRODUCTS,
  SEED_SUPERMARKET_PRODUCTS,
} from "../data/seedData.js";

async function seed() {
  try {
    console.log("[Seeder] Connecting to MongoDB...");
    await connectDB();

    console.log("[Seeder] Clearing old records...");
    await Product.deleteMany({});
    await GalleryItem.deleteMany({});

    console.log("[Seeder] Inserting Gallery Items...");
    const galleryResult = await GalleryItem.insertMany(SEED_GALLERY_ITEMS);
    console.log(`[Seeder] Inserted ${galleryResult.length} gallery items.`);

    console.log("[Seeder] Inserting Products...");
    const allProducts = [
      ...SEED_MANUFACTURED_PRODUCTS,
      ...SEED_SUPERMARKET_PRODUCTS,
    ];
    const productResult = await Product.insertMany(allProducts);
    console.log(`[Seeder] Inserted ${productResult.length} products total.`);

    console.log("[Seeder] Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("[Seeder] Error during seeding:", error);
    process.exit(1);
  }
}

seed();
