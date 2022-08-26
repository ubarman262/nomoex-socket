require("dotenv").config({ path: "./.env" });
require("better-logging")(console, {
  format: (ctx) => `${ctx.date} ${ctx.time} ${ctx.type} ${ctx.msg}`,
});
const express = require("express");
const routes = require("./src/routes/routes");
const cluster = require("cluster");
const os = require("os");
const http = require("http");
const workerSize = os.cpus().length;
const socketIo = require("socket.io");
const PORT = process.env.PORT || 8000;
const cors = require("cors");

const getApiAndEmit = require("./src/controllers/socket");

if (workerSize > 1) {
  if (cluster.isMaster) {
    for (let index = 0; index < workerSize; index++) {
      cluster.fork();
    }
    cluster.on("exit", function (worker) {
      console.error(`Nomoex Api worker ${worker.id} exited with code ${worker.code}`);
    });
  } else {
    socketStarter();
  }
} else {
  socketStarter();
}

function createAndStartExpressServer() {
  const app = express();
  app.use(cors());
  routes(app);
  return http.createServer(app).listen(PORT, () => {
    console.info(`Nomoex Express server listening on ${PORT}`);
  });
}

function socketStarter() {
  const io = socketIo(createAndStartExpressServer(), {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
  let interval;
  io.on("connection", (socket) => {
    console.log("New client connected");
    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 5000);
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
}
