const https = require("https");

module.exports = function (apiURL) {
  return https
    .get(apiURL, (res) => {
      let data = "";

      // Data chunk received
      res.on("data", (chunk) => {
        data += chunk;
      });

      // Full response received
      res.on("end", () => {
        console.log(JSON.parse(data).explanation);
      });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
};
