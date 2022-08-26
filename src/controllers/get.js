const express = require("express");
const router = express.Router();
const apiProcessor = require("../process/api.processor");

router.get("/", apiProcessor);

module.exports = router;
