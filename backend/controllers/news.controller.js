import { parseNews } from "../utils.js";
import serviceProvider from "../models/serviceproviders.model.js";
import jwt from "jsonwebtoken";

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

export const getUserPreference = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const userId = await jwt.verify(token, process.env.JWT_SECRET)._id;
    const userPreference = await serviceProvider.findOne({ id: userId });
    res.status(200).send(userPreference);
  } catch (error) {
    res.status(500).send("Error: " + error);
  }
};

export const setUserPreference = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const userId = await jwt.verify(token, process.env.JWT_SECRET)._id;
    const userPreference = new serviceProvider({
      id: userId,
      TimesOfIndia: req.body.TimesOfIndia,
      HindustanTimes: req.body.HindustanTimes,
      NDTV: req.body.NDTV,
    });

    userPreference.save();

    res.status(200).send("User preference saved successfully");
  } catch (error) {
    res.status(500).send("Error: " + error);
  }
};
