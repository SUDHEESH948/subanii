import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    name: {
      type: String,
      default: "Subani Administrator",
      trim: true,
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

// Method to verify password (supports both bcrypt and legacy fallback)
adminUserSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password || !candidatePassword) return false;
  if (this.password.startsWith("$2a$") || this.password.startsWith("$2b$")) {
    return bcrypt.compare(candidatePassword, this.password);
  }
  return candidatePassword === this.password;
};

export const AdminUser = mongoose.model("AdminUser", adminUserSchema);

/**
 * Ensures an initial admin account exists in MongoDB upon startup.
 */
export async function ensureDefaultAdmin() {
  try {
    const count = await AdminUser.countDocuments();
    if (count === 0) {
      const defaultUsername = (process.env.ADMIN_USERNAME || "admin").trim().toLowerCase();
      const defaultEmail = (process.env.ADMIN_EMAIL || "admin@subani.in").trim().toLowerCase();
      const rawPassword = process.env.ADMIN_PASSWORD || "admin123";
      const hashedPassword = await bcrypt.hash(rawPassword, 10);

      await AdminUser.create({
        username: defaultUsername,
        email: defaultEmail,
        password: hashedPassword,
        name: "Subani Administrator",
      });
      console.log(
        `[Admin] Initialized default admin account: ${defaultUsername} / ${defaultEmail}`,
      );
    }
  } catch (err) {
    console.error("[Admin] Error initializing default admin account:", err.message);
  }
}
