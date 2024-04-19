import express from "express";

import {
  getTOINews,
  getHTNews,
  getNDTVNews,
  setUserPreference,
  getUserPreference,
} from "../controllers/news.controller.js";

const router = express.Router();

router.get("/toi", getTOINews);
router.get("/ht", getHTNews);
router.get("/ndtv", getNDTVNews);
router.post("/setPreference", setUserPreference);
router.get("/getPreferences", getUserPreference);

export default router;
