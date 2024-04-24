import parseNews from "../utils/parseNews.js";
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
    return data;
  } catch (error) {
    res.status(500).send("Error: " + error);
  }
};

export const getNews = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const userId = await jwt.verify(token, process.env.JWT_SECRET)._id;
    const userPreference = await serviceProvider.findOne({ id: userId });
    const news = [];
    if (userPreference.HindustanTimes) {
      const data = await parseNews(
        "https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml"
      );
      news.push(...data);
    }
    if (userPreference.TimesOfIndia) {
      const data = await parseNews(
        "https://timesofindia.indiatimes.com/rssfeedstopstories.cms"
      );
      news.push(...data);
    }
    if (userPreference.NDTV) {
      const data = await parseNews(
        "https://feeds.feedburner.com/ndtvnews-top-stories"
      );
      news.push(...data);
    }
    res.status(200).send(news);
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
    return userPreference;
  } catch (error) {
    res.status(500).send("Error: " + error);
  }
};

export const setUserPreference = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const userId = await jwt.verify(token, process.env.JWT_SECRET)._id;
    const existingPreference = await serviceProvider.findOne({ id: userId });

    if (existingPreference) {
      const updatedFields = {
        TimesOfIndia: req.body.TimesOfIndia,
        HindustanTimes: req.body.HindustanTimes,
        NDTV: req.body.NDTV,
      };

      await serviceProvider.updateOne(
        { id: userId },
        { $set: { ...updatedFields } }
      );

      res.status(200).json({
        message: "User preference updated successfully",
        data: updatedFields,
      });
    } else {
      const userPreference = new serviceProvider({
        id: userId,
        TimesOfIndia: req.body.TimesOfIndia,
        HindustanTimes: req.body.HindustanTimes,
        NDTV: req.body.NDTV,
      });
      await userPreference.save();
      res.status(200).send("User preference saved successfully");
    }
  } catch (error) {
    res.status(500).send("Error: " + error);
  }
};
