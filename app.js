import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import session from "express-session";
import mongoStore from "connect-mongo";
import cookieParser from "cookie-parser";

import productRouter from "./routes/productsRoute.js";
import cartRouter from "./routes/cartsRoute.js";
import { connectDB } from "./db/mongoConnection.js";
import userRouter from "./routes/usersRoute.js";
import sessionRouter from "./routes/sessionsRoute.js";

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

app.use("/api/sessions", sessionRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

const httpServer = app.listen(PORT, () => {
  console.log(`Escuchando en http://localhost:${PORT}`);
  connectDB(MONGO_URL);
});
