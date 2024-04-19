import parser from "rss-to-json-text";

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
