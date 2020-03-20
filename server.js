const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRouter = require("./routes/authRouter");
const facebookRouter = require("./routes/facebookRouter");

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

server.use("/auth", authRouter);
server.use("/facebook", facebookRouter);

server.get("/", (req, res) => {
  res.json({
    api: "Denmercs Photography BE is running"
  });
});

module.exports = server;
