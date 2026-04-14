import winston from "winston";

const logLevel = process.env.LOG_LEVEL || "info";
const isDevelopment = process.env.NODE_ENV !== "production";

export const logger = winston.createLogger({
  level: logLevel,
  format: isDevelopment
    ? winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    : winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
  defaultMeta: { service: "velocitycore-api" },
  transports: [
    new winston.transports.Console(),
    ...(isDevelopment
      ? []
      : [
          new winston.transports.File({ filename: "error.log", level: "error" }),
          new winston.transports.File({ filename: "combined.log" })
        ])
  ]
});
