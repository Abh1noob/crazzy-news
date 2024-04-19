import mongoose from "mongoose";

const newsSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  link: {
    type: String,
    required: [true, "Please provide a link"],
  },
  publishedAt: {
    type: String,
    required: false,
  },
  thumbnail: {
    type: String,
    required: false,
  },
});

const news = mongoose.model("news", newsSchema);

export default news;
