import express from "express";
import {
  getGalleryItems,
  getGalleryItemById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from "../controllers/galleryController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(getGalleryItems);
router.post("/", requireAuth, createGalleryItem);

router.get("/:id", getGalleryItemById);
router.put("/:id", requireAuth, updateGalleryItem);
router.delete("/:id", requireAuth, deleteGalleryItem);

export default router;
