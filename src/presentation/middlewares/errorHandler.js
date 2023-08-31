import { logger } from '../../config/logger.config.js';

const errorHandler = (err, req, res, next) => {
  //errorLogger.error(err);
  if (err?.message?.includes('not found')) {
    logger.error(err.stack);
    return res.status(404).json({ message: err.message });
  } else if (err?.name?.includes('ZodError')) {
    logger.error(err.stack);
    return res.status(400).json({ message: err.issues });
  } else if (err?.message?.includes('exists')) {
    logger.error(err.stack);
    return res.status(409).json({ message: err.message });
  } else if (err?.message?.includes('Password')) {
    logger.error(err.stack);
    return res.status(403).json({ message: err.message });
  } else if (err?.message?.includes('cannot')) {
    logger.error(err.stack);
    return res.status(400).json({ message: err.message });
  } else if (err?.message?.includes('Order fail')) {
    logger.error(err.stack);
    return res.status(400).json({ message: err.message, noStockProducts: err.noStockProducts });
  }

  logger.error(err.stack);
  return res.status(500).json({ message: err.message });
};

export default errorHandler;
