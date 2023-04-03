import winston from "winston";
const warnLogger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({ filename: "./logs/warn.log", level: "warn" }),
  ],
});

const errorLogger = winston.createLogger({
  level: "error",
  transports: [
    new winston.transports.Console({ level: "error" }),
    new winston.transports.File({
      filename: "./logs/error.log",
      level: "error",
    }),
  ],
});

export { warnLogger, errorLogger };
