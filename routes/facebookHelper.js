const FacebookGraph = require("facebookgraph");

const graph = new FacebookGraph(process.env.FACEBOOK_PAGE_API_KEY);

async function getAlbums() {
  const albums = await graph.fetch(
    "151286648726328",
    "albums",
    "name, location, description",
    Infinity
  );
  return albums;
}

async function getAlbumData(id) {
  const albumData = await graph.fetch(
    `${id}`,
    "photos",
    "picture, images",
    Infinity
  );
  return albumData;
}

module.exports = {
  getAlbums,
  getAlbumData
};
