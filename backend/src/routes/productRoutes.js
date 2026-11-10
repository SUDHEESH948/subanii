import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(getProducts);
router.post("/", requireAuth, createProduct);

router.get("/:id", getProductById);
router.put("/:id", requireAuth, updateProduct);
router.delete("/:id", requireAuth, deleteProduct);

export default router;
