require("dotenv").config();
const logger = require("../logs/logger");

module.exports = (app) => {
  const port = process.env.genshin_catalogue_PORT || "3031";
  app.listen(port, () => {
    logger.info(`Server started and listening on port ${port} `);
  });
};
