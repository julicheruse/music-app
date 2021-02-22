const getAuth = require("../services/spotifyAuth.js");
const express = require("express");
const axios = require("axios");
const server = express();

server.get("/:id", (req, res) => {
  const { id } = req.params;

  getAuth()
    .then((token) => {
      axios
        .get(`https://api.spotify.com/v1/tracks/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then(({ data }) => {
          res.json(data);
        });
    })
    .catch(({ err }) => console.log(err.data));
});

module.exports = server;
