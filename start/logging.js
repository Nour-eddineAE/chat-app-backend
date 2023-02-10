const morgan = require("morgan");
const logger = require("../logs/logger");
// express error handler
require("express-async-errors");

module.exports = function (app) {
  // set morgan stream to winston stream
  app.use(morgan("combined", { stream: logger.stream }));
};
