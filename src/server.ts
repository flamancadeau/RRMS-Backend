import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app";



const PORT = Number(process.env.PORT) || 5000;

const startServer = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined");
    }

    await mongoose.connect(mongoUri);

    console.log("MongoDB Connected...");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Server startup error: ${error.message}`);
    } else {
      console.error("Server startup error:", error);
    }

    process.exit(1);
  }
};


startServer();