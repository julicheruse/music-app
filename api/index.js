const express = require("express");
const cors = require("cors");
const server = express();
const searchRouter = require("./routes/search");
const aboutRouter = require("./routes/about.js");

server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(cors());

server.use("/search", searchRouter);
server.use("/about", aboutRouter);

server.listen(8888, () => {
  console.log(`Server on port 8888`);
});
