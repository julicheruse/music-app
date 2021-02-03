const express = require("express");
const axios = require("axios");
const cors = require("cors");
const server = express();

//const searchRouter = require("./src/routes/search.js");

server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(cors());

//server.use("/search", searchRouter);

var SpotifyWebApi = require("spotify-web-api-node");

// credentials are optional
/* var spotifyApi = new SpotifyWebApi({
  clientId: "3efbd747662a4b2fbaf70456f529eb09",
  clientSecret: "67c16de5b0b54807a2427c2860851909",
  redirectUri: "https://localhost:8888/callback",
}); */

var client_id = "3efbd747662a4b2fbaf70456f529eb09"; // Your client id
var client_secret = "67c16de5b0b54807a2427c2860851909"; // Your secret

let spotifyApi;

server.get("/", (req, res) => {
  axios
    .post("https://accounts.spotify.com/api/token", {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      params: {
        grant_type: "client_credentials",
      },
    })
    .then(
      ({ data }) =>
        (spotifyApi = axios.create({
          headers: {
            Authorization: "Bearer " + data.access_token,
          },
        }))
    )
    .catch((err) => console.log(err));
});

server.listen(8888, () => {
  console.log(`Server on port 8888`);
});
