import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import news from "./routes/news.routes.js";
import user from "./routes/user.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  try {
    const response = await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: " + error.message);
  }
};

connectDB();
app.use("/api/news", news);
app.use("/api/auth", user);

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.listen(3000, () => {
  console.log("server started");
});
