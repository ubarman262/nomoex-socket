const axios = require("axios");

const BINANCE_API =
  "https://api.binance.com/api/v3/ticker/24hr?symbols=[%22BTCUSDT%22,%22ETHUSDT%22,%22ENJUSDT%22,%22GRTUSDT%22]";

const getApindpoints = () => {
  return {
    binanceApi: () => BINANCE_API,
  };
};

const axiosCall = async (endpoint) => {
  return await axios
    .get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error.message);
      res.status(500).send(error.message);
    });
};

module.exports = {
  getApindpoints,
  axiosCall,
};
