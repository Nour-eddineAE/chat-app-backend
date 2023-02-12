const logger = require("../logs/logger");

module.exports = function (error, request, response, next) {
  //Express context errors handling
  response.status(500).send("Something failed.");
  logger.error(error);
};
