const express = require("express");
const router = express.Router();
const facebookHelper = require("./facebookHelper");
const NodeGeocoder = require("node-geocoder");

let options = {
  provider: "opencage",
  httpAdapter: "https",
  apiKey: process.env.OPENCAGE_GEOCODING_API_KEY,
  formatter: null
};

let geocoder = NodeGeocoder(options);

router.get("/albums/", async (req, res) => {
  try {
    let fbDatas = await facebookHelper.getAlbums();
    let newAlbumInfo = [];

    fbDatas.map(async data => {
      if (data.location !== undefined || data.location === "") {
        let geoCodedLocation = await geocoder.geocode(data.location);
        if (geoCodedLocation) {
          newAlbumInfo.push(geoCodedLocation);
        }
      }
    });
    res.status(200).json(newAlbumInfo);

    // res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
