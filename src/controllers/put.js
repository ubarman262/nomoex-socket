const express = require("express");
const router = express.Router();
const apiProcessor = require("../process/api.processor");

router.put("/update", apiProcessor);

module.exports = router;
