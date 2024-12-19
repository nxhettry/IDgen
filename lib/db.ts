import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.DB_URI) {
      console.log("DB_URI not found in .env file");
      return;
    }
    const connection = await mongoose.connect(process.env.DB_URI);

    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error("An unknown error occurred");
    }
    process.exit(1);
  }
};
