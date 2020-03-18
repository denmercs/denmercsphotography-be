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

module.exports = {
  getAlbums
};
