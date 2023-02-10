require("dotenv").config();
const config = require("config");
const winston = require("winston");
require("winston-mongodb");
const appRoot = require("app-root-path");

const loggingOptions = {
  file: {
    level: config.get("FILE_LOGGING_LEVEL"),
    filename: `${appRoot}/logs/logfile.log`,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
  },
  console: {
    level: config.get("CONSOLE_LOGGING_LEVEL"),
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  },
  db: {
    level: config.get("DB_LOGGING_LEVEL"),
    db: config.get("DB_URL"),
    options: {
      useUnifiedTopology: true,
    },
  },
};
const uncaughtExceptionOptions = {
  file: {
    level: config.get("FILE_LOGGING_LEVEL"),
    filename: `${appRoot}/logs/exceptionfile.log`,
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
  },
  console: {
    level: config.get("CONSOLE_LOGGING_LEVEL"),
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  },
  db: {
    level: config.get("DB_LOGGING_LEVEL"),
    db: config.get("DB_URL"),
    handleExceptions: true,
    options: {
      useUnifiedTopology: true,
    },
  },
};

let logger;

if (config.get("NODE_ENV") === "production") {
  logger = winston.createLogger({
    transports: [
      // disable console logging in prod mode
      new winston.transports.File(loggingOptions.file),
      new winston.transports.MongoDB(loggingOptions.db),
    ],
    exceptionHandlers: [
      // enable uncaught exception/rejected promises handling
      new winston.transports.File(uncaughtExceptionOptions.file),
      new winston.transports.MongoDB(uncaughtExceptionOptions.db),
    ],
    exitOnError: true, // kill the process if exception
  });
} else if (config.get("NODE_ENV") === ("development" || "default")) {
  logger = winston.createLogger({
    transports: [
      new winston.transports.File(loggingOptions.file),
      new winston.transports.Console(loggingOptions.console),
      new winston.transports.MongoDB(loggingOptions.db),
    ],
    exceptionHandlers: [
      new winston.transports.File(uncaughtExceptionOptions.file),
      new winston.transports.MongoDB(uncaughtExceptionOptions.db),
      new winston.transports.Console(uncaughtExceptionOptions.console),
    ],
    exitOnError: true,
  });
} else {
  // test environment
  logger = winston.createLogger({
    transports: [new winston.transports.File(loggingOptions.file)],
    exceptionHandlers: [
      new winston.transports.File(uncaughtExceptionOptions.file),
    ],
    exitOnError: true,
  });
}

// a stream object with a 'write' function that will be used to set morgan's stream
logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};

module.exports = logger;
