import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { AdminUser } from "../models/AdminUser.js";
import { requireAuth, getJwtSecret } from "../middleware/auth.js";

const router = express.Router();

/**
 * POST /api/auth/login
 * Validates credentials against MongoDB database (checks username or email).
 */
router.post("/login", async (req, res) => {
  try {
    const rawIdentifier = String(
      req.body?.identifier || req.body?.username || req.body?.email || "",
    ).trim();
    const password = String(req.body?.password ?? "");

    if (!rawIdentifier || !password) {
      return res.status(400).json({
        success: false,
        message: "Username/email and password are required.",
      });
    }

    const cleanIdentifier = rawIdentifier.toLowerCase();

    // Look up admin by either username or email in MongoDB
    const admin = await AdminUser.findOne({
      $or: [{ username: cleanIdentifier }, { email: cleanIdentifier }],
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid username/email or password.",
      });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid username/email or password.",
      });
    }

    // Update last login timestamp
    admin.lastLogin = new Date();
    await admin.save();

    const token = jwt.sign(
      {
        id: admin._id,
        username: admin.username,
        email: admin.email,
      },
      getJwtSecret(),
      { expiresIn: "8h" },
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        username: admin.username,
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (error) {
    console.error("[Auth] Login error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during authentication.",
    });
  }
});

/**
 * GET /api/auth/me
 * Returns current authenticated admin profile.
 */
router.get("/me", requireAuth, async (req, res) => {
  try {
    const admin =
      (req.user?.id && (await AdminUser.findById(req.user.id))) ||
      (req.user?.username &&
        (await AdminUser.findOne({ username: req.user.username }))) ||
      (await AdminUser.findOne());

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin account not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        username: admin.username,
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not fetch admin profile.",
    });
  }
});

/**
 * PUT /api/auth/update-credentials
 * Allows changing admin email, username, and password directly in the database.
 */
router.put("/update-credentials", requireAuth, async (req, res) => {
  try {
    const newUsername = String(req.body?.newUsername ?? "").trim().toLowerCase();
    const newEmail = String(req.body?.newEmail ?? "").trim().toLowerCase();
    const newPassword = String(req.body?.newPassword ?? "");

    // Locate active admin record
    const admin =
      (req.user?.id && (await AdminUser.findById(req.user.id))) ||
      (req.user?.username &&
        (await AdminUser.findOne({ username: req.user.username }))) ||
      (await AdminUser.findOne());

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin account not found.",
      });
    }

    // Update username if requested
    if (newUsername && newUsername !== admin.username) {
      if (newUsername.length < 3) {
        return res.status(400).json({
          success: false,
          message: "New username must be at least 3 characters long.",
        });
      }

      const existingUser = await AdminUser.findOne({
        username: newUsername,
        _id: { $ne: admin._id },
      });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "This username is already taken by another account.",
        });
      }
      admin.username = newUsername;
    }

    // Update email if requested
    if (newEmail && newEmail !== admin.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newEmail)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid email address.",
        });
      }

      const existingEmail = await AdminUser.findOne({
        email: newEmail,
        _id: { $ne: admin._id },
      });
      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message: "This email address is already taken by another account.",
        });
      }
      admin.email = newEmail;
    }

    // Update password if requested
    if (newPassword) {
      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: "New password must be at least 6 characters long.",
        });
      }
      admin.password = await bcrypt.hash(newPassword, 10);
    }

    await admin.save();

    // Generate fresh JWT token with updated credentials
    const token = jwt.sign(
      {
        id: admin._id,
        username: admin.username,
        email: admin.email,
      },
      getJwtSecret(),
      { expiresIn: "8h" },
    );

    return res.status(200).json({
      success: true,
      message: "Admin credentials updated successfully in MongoDB.",
      token,
      user: {
        username: admin.username,
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (error) {
    console.error("[Auth] Error updating credentials:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update admin credentials.",
    });
  }
});

export default router;
