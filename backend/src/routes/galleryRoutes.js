import express from "express";
import jwt from "jsonwebtoken";
import {
  getGalleryItems,
  getGalleryItemById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from "../controllers/galleryController.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "change_me_in_production";

const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

router.route("/").get(getGalleryItems);
router.post("/", requireAuth, createGalleryItem);

router.get("/:id", getGalleryItemById);
router.put("/:id", requireAuth, updateGalleryItem);
router.delete("/:id", requireAuth, deleteGalleryItem);

export default router;
