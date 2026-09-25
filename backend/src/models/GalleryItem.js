import mongoose from "mongoose";

const galleryItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Gallery item title is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Venture category is required"],
      trim: true,
      index: true,
    },
    tagline: {
      type: String,
      default: "",
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image URL/path is required"],
    },
    isLogo: {
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

galleryItemSchema.index({ category: 1, order: 1 });

export const GalleryItem = mongoose.model("GalleryItem", galleryItemSchema);
