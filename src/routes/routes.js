const get = require("../controllers/get");
const put = require("../controllers/put");
const express = require("express");

function routes(app) {
  app.use(express.json());
  app.use("/nomoexapi", get);
  app.use("/nomoexapi/put", put);
}

module.exports = routes;

