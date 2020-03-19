const express = require("express");
const router = express.Router();
const facebookHelper = require("../helper/facebookHelper");
const geocode = require("../helper/geocode");

router.get("/albums/", async (req, res) => {
  try {
    let fbDatas = await facebookHelper.getAlbums();
    let withGeoCodes = [];

    for (let i = 0; i < fbDatas.length; i++) {
      if (fbDatas[i].location !== undefined) {
        console.log(fbDatas[i].name);
        let geocodes = await geocode.geosearch(fbDatas[i].location);
        let coverPhoto = await facebookHelper.getCoverPhoto(fbDatas[i].id);
        withGeoCodes.push({
          id: fbDatas[i].id,
          name: fbDatas[i].name,
          description: fbDatas[i].description,
          latitude: geocodes[0].lat,
          longitude: geocodes[0].lon,
          coverPhoto: coverPhoto[1].picture
        });
      }
    }
    res.status(200).json(withGeoCodes);
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

    res.status(200).json(fbAlbumData);
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
