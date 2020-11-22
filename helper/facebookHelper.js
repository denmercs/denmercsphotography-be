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
  const data = await graph.fetch(`${id}`, "albums");
  return data;
}

async function getAlbumPictures(id) {
  const pictures = await graph.fetch(
    `${id}`,
    "photos",
    "picture, images",
    Infinity
  );
  return pictures;
}

async function getCoverPhoto(id) {
  const coverPhoto = await graph.fetch(`${id}`, "photos", "picture", Infinity);

  return coverPhoto;
}

async function getAlbumsWithCoverPhoto() {
  const albums = await graph.fetch(
    "151286648726328",
    "albums",
    "name, picture",
    Infinity
  );

  return albums;
}

module.exports = {
  getAlbums,
  getAlbumData,
  getAlbumPictures,
  getCoverPhoto,
  getAlbumsWithCoverPhoto,
};
