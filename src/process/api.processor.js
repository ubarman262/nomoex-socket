const utils = require("../utils/utils");
const nomoexApiResponse = require("../models/nomoexApiResponse");
const apiEndpoints = utils.getApindpoints();

module.exports = async (req, res) => {
  const apiResponse = new nomoexApiResponse();
  try {
    if (req.query.type === "binance") {
      const data = await binanceCaller();
      apiResponse.setNonoexApiResponse(data);
    }
    res.json(apiResponse);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const binanceCaller = async () => {
  const data = await utils.axiosCall(apiEndpoints.binanceApi());
  return data;
};
