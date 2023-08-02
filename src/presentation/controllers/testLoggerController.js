import { logger } from "../../config/logger.config.js";
const isProduction = process.env.NODE_ENV === "production";
const testLogger = (req, res, next) => {
  logger.info(`info`);
  logger.warn(`warn`);
  logger.error(`error`);
  logger.fatal(`fatal`);
  const message = isProduction
    ? "[Prod Mode] Check into logs/error.log"
    : "[Dev Mode] Check the console";
  return res.status(200).json({
    message: message,
  });
};
export default testLogger;
