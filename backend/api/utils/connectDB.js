import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  try {
    const response = await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: " + error.message);
  }
};
export default connectDB;
