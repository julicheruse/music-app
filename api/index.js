const express = require("express");
const axios = require("axios");
const cors = require("cors");
const server = express();
const searchRouter = require("./routes/search");
//const searchRouter = require("./src/routes/search.js");

server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(cors());

server.use("/search", searchRouter);

server.listen(8888, () => {
  console.log(`Server on port 8888`);
});
