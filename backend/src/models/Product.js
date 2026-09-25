import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      index: true,
    },
    brand: {
      type: String,
      required: [true, "Brand / Division is required"],
      enum: [
        "KOOLATH SUPERMARKET",
        "KOOLATH MILLING COMPANY",
        "IFTAR FOOD INDUSTRIES",
      ],
      index: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      index: true,
    },
    price: {
      type: String,
      default: "Available on Request",
    },
    specs: {
      type: [String],
      default: ["100% Pure", "Quality Checked", "Hygienically Packed"],
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    fallback: {
      type: String,
      default: "",
    },
    whatsapp: {
      type: String,
      default: "917510116699",
    },
    phone: {
      type: String,
      default: "+91 75101 16699",
    },
    slug: {
      type: String,
      default: "",
    },
    unit: {
      type: String,
      default: "",
    },
    variants: {
      type: [String],
      default: [],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

productSchema.index({
  name: "text",
  brand: "text",
  category: "text",
  description: "text",
});

export const Product = mongoose.model("Product", productSchema);
