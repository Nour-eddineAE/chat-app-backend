require("dotenv").config();
const webSockets = require("../websockets/index");
const logger = require("../logs/logger");

module.exports = async (app) => {
  const port = process.env.genshin_catalogue_PORT || "3031";
  const server = app.listen(port, () => {
    logger.info(`Server started and listening on port ${port} `);
  });
  //attach express server to websocket server
  await webSockets(server);
};
