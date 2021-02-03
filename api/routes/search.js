const getAuth = require("../services/spotifyAuth.js");
const express = require("express");
const axios = require("axios");
const server = express();

server.get("/", (req, res) => {
  req.query;
  getAuth()
    .then((token) => {
      axios
        .get("https://api.spotify.com/v1/search?q=bohemian&type=track", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then(({ data }) => {
          res.json(data.tracks.items);
        });
    })
    .catch((err) => console.log(err));
});

module.exports = server;
