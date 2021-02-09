const getAuth = require("../services/spotifyAuth.js");
const express = require("express");
const axios = require("axios");
const server = express();

server.get("/", (req, res) => {
  const { q, type, offset } = req.query;
  getAuth()
    .then((token) => {
      axios
        .get(
          `https://api.spotify.com/v1/search?q=${q}&type=${type}&offset=${offset}&limit=10`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then(({ data }) => {
          res.json(data);
        });
    })
    .catch((err) => console.log(err));
});

module.exports = server;
