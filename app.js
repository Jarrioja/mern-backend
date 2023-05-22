import dotenv from "dotenv";
dotenv.config();
import express from "express";
import session from "express-session";
import mongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import passport from "passport";
import { engine } from "express-handlebars";
import { resolve } from "path";

import { connectDB } from "./db/mongoConnection.js";
import initializePassport from "./config/passport.config.js";
import productRouter from "./routes/productsRoute.js";
import cartRouter from "./routes/cartsRoute.js";
import userRouter from "./routes/usersRoute.js";
import sessionRouter from "./routes/sessionsRoute.js";
import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorHandler.js";

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URI;
const SECRET_KEY = process.env.SECRET_KEY || "CoderS3cR3tC0D3";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    store: mongoStore.create({
      mongoUrl: MONGO_URL,
      ttl: 15,
    }),
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
const viewsPath = resolve("views");
app.engine(
  "handlebars",
  engine({
    layoutsDir: `${viewsPath}/layouts`,
    defaultLayout: `${viewsPath}/layouts/main.handlebars`,
  })
);
app.set("view engine", "handlebars");
app.set("views", viewsPath);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(logger);
app.get("/", (req, res) => {
  const userData = {
    email: req.session.user.email,
    role: req.session.user.role,
  };
  res.render("home", userData);
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.use("/api/sessions", sessionRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
// app.use(errorHandler);

const httpServer = app.listen(PORT, () => {
  console.log(`Escuchando en http://localhost:${PORT}`);
  connectDB(MONGO_URL);
});
