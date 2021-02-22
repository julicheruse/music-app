const express = require("express");
const cors = require("cors");
const server = express();
const searchRouter = require("./routes/search");
const artistRouter = require("./routes/artist");
const trackRouter = require("./routes/track");

server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(cors());

server.use("/search", searchRouter);
server.use("/artist", artistRouter);
server.use("/track", trackRouter);

server.listen(8888, () => {
  console.log(`Server on port 8888`);
});
