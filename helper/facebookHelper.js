const FacebookGraph = require("facebookgraph");

const graph = new FacebookGraph(process.env.FACEBOOK_PAGE_API_KEY);

async function getAlbums() {
  const albums = await graph.fetch(
    "151286648726328",
    "albums",
    "name, location",
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

async function getCoverPhoto(id) {
  const coverPhoto = await graph.fetch(`${id}`, "photos", "picture", Infinity);

  return coverPhoto;
}

async function getAlbumsWithCoverPhoto() {
  const albums = await graph.fetch(
    "151286648726328",
    "albums",
    "name, cover_photo",
    Infinity
  );

  return albums;
}

module.exports = {
  getAlbums,
  getAlbumData,
  getCoverPhoto,
  getAlbumsWithCoverPhoto,
};
