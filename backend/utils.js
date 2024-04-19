import parser from "rss-to-json-text";
import jwt from "jsonwebtoken";

export const parseNews = async (url) => {
  const data = await parser.parse(url);
  const dataJSON = [];

  data.items.map((item) => {
    const temp = {
      title: item.title,
      description: item.description,
      link: item.link,
      publishedAt: item.published,
      thumbnail: item.enclosures[0].url,
    };
    dataJSON.push(temp);
  });
  return dataJSON;
};

export const generateLogToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: "Token not provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};
