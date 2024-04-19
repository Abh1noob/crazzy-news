import express from "express";
import news from "./routes/news.routes.js";

const app = express();

app.use("/api/news", news);

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.listen(3000, () => {
  console.log("server started");
});
