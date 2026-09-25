import { GalleryItem } from "../models/GalleryItem.js";

// @desc    Get all gallery items with optional category filtering
// @route   GET /api/gallery
export const getGalleryItems = async (req, res) => {
  try {
    const { category } = req.query;

    const query = {};
    if (category && category !== "All") {
      query.category = category;
    }

    const items = await GalleryItem.find(query).sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error fetching gallery items",
      error: error.message,
    });
  }
};

// @desc    Get single gallery item by ID
// @route   GET /api/gallery/:id
export const getGalleryItemById = async (req, res) => {
  try {
    const item = await GalleryItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error fetching gallery item",
      error: error.message,
    });
  }
};

// @desc    Create a new gallery item
// @route   POST /api/gallery
export const createGalleryItem = async (req, res) => {
  try {
    const item = await GalleryItem.create(req.body);
    res.status(201).json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid gallery item data",
      error: error.message,
    });
  }
};

// @desc    Update a gallery item
// @route   PUT /api/gallery/:id
export const updateGalleryItem = async (req, res) => {
  try {
    const item = await GalleryItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating gallery item",
      error: error.message,
    });
  }
};

// @desc    Delete a gallery item
// @route   DELETE /api/gallery/:id
export const deleteGalleryItem = async (req, res) => {
  try {
    const item = await GalleryItem.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Gallery item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error deleting gallery item",
      error: error.message,
    });
  }
};
