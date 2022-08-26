const utils = require("../utils/utils");
const apiEndpoints = utils.getApindpoints();

const getApiAndEmit = async (socket) => {
  try {
    socket.emit("FromAPI", await utils.axiosCall(apiEndpoints.binanceApi())); // Emitting a new message. It will be consumed by the client
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

module.exports = getApiAndEmit;
