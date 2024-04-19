import { parseNews } from "../utils.js";

export const getTOINews = async (req, res) => {
  try {
    const data = await parseNews(
      "https://timesofindia.indiatimes.com/rssfeedstopstories.cms"
    );
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Error: " + error);
  }
};

export const getHTNews = async (req, res) => {
  try {
    const data = await parseNews(
      "https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml"
    );
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Error: " + error);
  }
};

export const getNDTVNews = async (req, res) => {
  try {
    const data = await parseNews(
      "https://feeds.feedburner.com/ndtvnews-top-stories"
    );
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Error: " + error);
  }
};
