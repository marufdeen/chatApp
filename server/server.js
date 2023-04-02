const express = require("express");
const socketIO = require("socket.io");
const { createServer } = require("http");
const path = require("path");
const bodyParser = require("body-parser");

const publicPath = path.join(__dirname, "../public");
const app = express();
const httpServer = createServer(app);

app.use(bodyParser.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicPath));

const port = process.env.PORT || 4000;
const io = socketIO(httpServer);

io.on("connect", (socket) => {
  console.log("A new user just connected");

  socket.on("disconnect", () => {
    console.log("A new user just disconnected");
  });
});
httpServer.listen(port, () => {
  console.log(`Chat App running on port ${port}`);
});
