const WebSocket = require("ws");
const QueryString = require("qs");
const logger = require("../logs/logger");

module.exports = async (expressServer) => {
  const websocketServer = new WebSocket.Server({
    noServer: true,
    path: "/websockets",
  });

  expressServer.on("upgrade", (request, socket, head) => {
    websocketServer.handleUpgrade(request, socket, head, (websocket) => {
      websocketServer.emit("connection", websocket, request);
    });
  });

  websocketServer.on(
    "connection",
    function connection(websocketConnection, connectionRequest) {
      logger.info(`Connected to websocket attached to express server... `);
      const [_path, _params] = connectionRequest?.url?.split("?");
      // const connectionParams = QueryString.parse(params);

      // ? NOTE: connectParams are not used here but good to understand how to get
      // ? to them if you need to pass data with the connection to identify it (e.g., a userId).

      websocketConnection.on("message", (message) => {
        const parsedMessage = JSON.parse(message);
        console.log("Parsed message ", parsedMessage);
        //TODO save message to db
        websocketServer.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN)
            client.send(JSON.stringify(parsedMessage));
        });
      });

      websocketConnection.on("close", (event) => {
        logger.info(`Client disconnected`);
      });
    }
  );

  return websocketServer;
};
