import express from "express";
import cookieParser from "cookie-parser";

import productRouter from "../routes/productsRoute.js";
import cartRouter from "../routes/cartsRoute.js";
import userRouter from "../routes/usersRoute.js";
import sessionRouter from "../routes/sessionsRoute.js";
import roleRouter from "../routes/roleRoute.js";

import logger from "../middlewares/logger.js";
import errorHandler from "../middlewares/errorHandler.js";
import compression from "express-compression";

class AppExpress {
  init() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(
      compression({
        brotli: {
          enabled: true,
          zlib: {},
        },
      })
    );
  }
  build() {
    this.app.use(logger);
    this.app.use("/api/sessions", sessionRouter);
    this.app.use("/api/users", userRouter);
    this.app.use("/api/roles", roleRouter);
    this.app.use("/api/products", productRouter);
    this.app.use("/api/carts", cartRouter);
    this.app.use(errorHandler);
  }
  callback() {
    return this.app;
  }

  close() {
    this.server.close();
  }

  listen() {
    return this.app.listen(process.env.PORT, () => {
      console.log(`Server listening on port ${process.env.PORT}`);
    });
  }
}

export default AppExpress;
