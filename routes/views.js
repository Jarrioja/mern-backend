import { Router } from "express";
import ProductManager from "../dao/productManager.js";

const viewsRouter = Router();
const productManager = new ProductManager("products.json");

viewsRouter.get("/", async function (req, res) {
  res.render("index", {});
});

viewsRouter.get("/products", async function (req, res) {
  const products = await productManager.readFile();

  res.render("home", {
    sectionTitle: "Todos los productos",
    products: products,
  });
});

viewsRouter.get("/realtimeproducts", async function (req, res) {
  const products = await productManager.readFile();
  const io = req.app.get("io");
  io.on("connection", (socket) => {
    const productManager = new ProductManager("products.json");
    console.log("Nuevo cliente conectado");
    //Añadir producto
    socket.on("addProduct", async (data) => {
      console.log(data);
      const {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
      } = data;
      const newProduct = await productManager.createProduct({
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
      });
      console.log(newProduct);
      if (newProduct) {
        socket.emit("productAdded", newProduct);
      }
    });
    //Eliminar Product
    socket.on("deleteProduct", async (productId) => {
      const deletedProduct = await productManager.removeProductById(productId);
      if (deletedProduct) {
        console.log(`delete product id ${productId}`);
        socket.emit("productDeleted", productId);
      }
    });
  });
  res.render("realTimeProducts", {
    sectionTitle: "Productos en tiempo real",
    products: products,
  });
});

export default viewsRouter;
