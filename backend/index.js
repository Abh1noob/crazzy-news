import express from "express";
import { parseNews } from "./utils.js";

const app = express();

app.get("/toi", async (req, res) => {
  try {
    const data = await parseNews(
      "https://timesofindia.indiatimes.com/rssfeedstopstories.cms"
    );
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Error:", error);
  }
});

app.get("/ht", async (req, res) => {
  try {
    const data = await parseNews(
      "https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml"
    );
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Error:", error);
  }
});

app.get("/ndtv", async (req, res) => {
  try {
    const data = await parseNews(
      "https://feeds.feedburner.com/ndtvnews-top-stories"
    );
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Error:", error);
  }
});

app.listen(3000, () => {
  console.log("server started");
});
