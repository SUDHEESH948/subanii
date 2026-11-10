import express from "express";
import multer from "multer";
import { requireAuth } from "../middleware/auth.js";

// Store uploaded files in memory instead of writing to disk / uploads folder
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp|svg|gif/;
  const ext = file.originalname.split(".").pop().toLowerCase();
  const mime = file.mimetype;
  if (allowed.test(ext) || mime.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only image files are allowed (jpeg, jpg, png, webp, svg, gif)",
      ),
    );
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
  fileFilter,
});

const router = express.Router();

router.post("/", requireAuth, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No image file uploaded" });
  }

  // Convert buffer directly into Base64 Data URL for storing in MongoDB
  const mime = req.file.mimetype || "image/jpeg";
  const base64 = req.file.buffer.toString("base64");
  const dataUrl = `data:${mime};base64,${base64}`;

  res.status(200).json({
    success: true,
    message: "Image processed for direct database storage",
    filename: req.file.originalname,
    imageUrl: dataUrl,
  });
});

export default router;
