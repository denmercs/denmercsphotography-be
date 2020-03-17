const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRouter = require("./routes/authRouter");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/auth", authRouter);

server.get("/", (req, res) => {
  res.json({
    api: "Denmercs Photography BE is running"
  });
});

module.exports = server;
