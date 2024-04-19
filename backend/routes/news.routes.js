import express from "express";

import {
  getTOINews,
  getHTNews,
  getNDTVNews,
} from "../controllers/news.controller.js";

const router = express.Router();

router.get("/toi", getTOINews);
router.get("/ht", getHTNews);
router.get("/ndtv", getNDTVNews);

export default router;
