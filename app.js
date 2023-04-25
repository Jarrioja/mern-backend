import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { resolve, dirname } from "path";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import productRouter from "./routes/products.js";
import cartRouter from "./routes/carts.js";
import viewsRouter from "./routes/views.js";
import { connectDB } from "./db/mongoConnection.js";
import { log } from "console";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use(express.static(`${__dirname}/public`));
app.use("/", viewsRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

const httpServer = app.listen(PORT, () => {
  console.log(`Escuchando en el ${PORT}`);
});
const io = new Server(httpServer);
app.set("io", io);
let messages = [];
io.on("connection", (socket) => {
  socket.on("message", (data) => {
    messages.push(data);
    io.emit("messageLogs", messages);
  });
});
connectDB(process.env.MONGO_URI);
