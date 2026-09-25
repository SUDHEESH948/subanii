import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const uri =
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/subani_db";
    const conn = await mongoose.connect(uri);
    console.log(
      `[MongoDB] Connected successfully: ${conn.connection.host}/${conn.connection.name}`,
    );
  } catch (error) {
    console.error(`[MongoDB] Connection error: ${error.message}`);
    process.exit(1);
  }
};

mongoose.connection.on("disconnected", () => {
  console.warn("[MongoDB] Connection lost, disconnected.");
});
