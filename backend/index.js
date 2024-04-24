import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import verifyToken from "./api/utils/auth/verifyToken.js"
import connectDB from "./api/utils/connectDB.js";

import news from "./api/routes/news.routes.js"
import user from "./api/routes/user.routes.js"

dotenv.config();

const app = express();

app.use(express.json());

await connectDB();

app.use("/api/news", news);
app.use("/api/auth", user);

app.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.listen(3000, () => {
  console.log("server started");
});
