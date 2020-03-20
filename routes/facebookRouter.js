const express = require("express");
const router = express.Router();
const facebookHelper = require("../helper/facebookHelper");
const geocode = require("../helper/geocode");

router.get("/wedding/albums/", async (req, res) => {
  try {
    let fbDatas = await facebookHelper.getAlbums();
    let wedding = [];

    for (let i = 0; i < fbDatas.length; i++) {
      if (
        fbDatas[i].location !== undefined &&
        fbDatas[i].name.toLowerCase().includes("wedding")
      ) {
        console.log(fbDatas[i].name.toLowerCase());
        let geocodes = await geocode.geosearch(fbDatas[i].location);
        let coverPhoto = await facebookHelper.getCoverPhoto(fbDatas[i].id);
        wedding.push({
          id: fbDatas[i].id,
          name: fbDatas[i].name,
          description: fbDatas[i].description,
          latitude: geocodes[0].lat,
          longitude: geocodes[0].lon,
          coverPhoto: coverPhoto[0].picture
        });
      }
    }
    res.status(200).json(wedding);
  } catch (err) {
    console.log(err);
  }
});

router.get("/engagement/albums/", async (req, res) => {
  try {
    let fbDatas = await facebookHelper.getAlbums();
    let wedding = [];

    for (let i = 0; i < fbDatas.length; i++) {
      if (
        fbDatas[i].location !== undefined &&
        fbDatas[i].name.toLowerCase().includes("engagement")
      ) {
        console.log(fbDatas[i].name.toLowerCase());
        let geocodes = await geocode.geosearch(fbDatas[i].location);
        let coverPhoto = await facebookHelper.getCoverPhoto(fbDatas[i].id);
        wedding.push({
          id: fbDatas[i].id,
          name: fbDatas[i].name,
          description: fbDatas[i].description,
          latitude: geocodes[0].lat,
          longitude: geocodes[0].lon,
          coverPhoto: coverPhoto[0].picture
        });
      }
    }
    res.status(200).json(wedding);
  } catch (err) {
    console.log(err);
  }
});

router.post("/geocodes/", async (req, res) => {
  try {
    let { location } = req.body;

    let geocodeUpdate = await geocoder.geocode(location);

    res.status(200).json(geocodeUpdate[0]);
  } catch (err) {
    console.log(err);
  }
});

router.post("/album/:id", async (req, res) => {
  try {
    let { id } = req.params;

    let fbAlbumData = await facebookHelper.getAlbumData(id);
    let newAlbum = [];

    for (let i = 0; i < fbAlbumData.length; i++) {
      newAlbum.push({
        src: fbAlbumData[i].images[2].source,
        thumbnail: fbAlbumData[i].images[8].source,
        thumbnailWidth: fbAlbumData[i].images[8].width,
        thumbnailHeight: fbAlbumData[i].images[8].height
      });
    }
    res.status(200).json(newAlbum);
  } catch (err) {
    console.log(err);
  }
});

router.post("/coverphoto/:id", async (req, res) => {
  try {
    let { id } = req.params;

    let coverPhoto = await facebookHelper.getCoverPhoto(id);
    res.status(200).json(coverPhoto);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
