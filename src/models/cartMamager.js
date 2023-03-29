import fs from "fs";

import ProductManager from "./productManager.js";
const productManager = new ProductManager("products.json");

export default class CartManager {
  #carts;
  #idAuto = 1;
  constructor(path) {
    this.#carts = [];
    this.path = path;
    if (!fs.existsSync(this.path)) {
      fs.promises.writeFile(this.path, "[]");
    }
  }
  async readFile() {
    try {
      const products = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(products || []);
    } catch (error) {
      console.log(`Archivo ${this.path} no existe, creando...`);
      await fs.promises.writeFile(this.path, "[]");
      return [];
    }
  }
  async updateFile(newCartData) {
    await fs.promises.writeFile(this.path, JSON.stringify(newCartData));
  }

  async loadCarts() {
    return (this.#carts = await this.readFile());
  }

  async createCart() {
    const carts = await this.loadCarts();
    if (!carts.length) {
      this.#idAuto = 1;
    } else {
      this.#idAuto = carts[carts.length - 1].id + 1;
    }
    console.log(this.#idAuto);
    const cart = {
      id: this.#idAuto,
      products: [],
    };
    carts.push(cart);
    await this.updateFile(carts);
  }
  async getCart(cartId) {
    try {
      const carts = await this.readFile();
      const cart = carts.find((cart) => cart.id === cartId);
      if (!cart) {
        throw Error("404 Carrito no encontrado");
      }
      return cart;
    } catch (error) {
      console.log(error);
    }
  }
  async addProduct(cartId, productId) {
    try {
      if (cartId === undefined || productId === undefined) {
        throw new Error("ERROR EN UNO DE LOS ID");
      }
      console.log(`Carrito: ${cartId} \nProducto: ${productId}`);
      const cart = await this.getCart(cartId);
      const productExists = await productManager.getProductsById(productId);
      const newProduct = { id: productId, qty: 1 };

      // BUSCAR CARRITO POR EL INDEX usando .findIndex()
      if (!cart) {
        throw Error("El Carrito NO existe");
      }
      if (!productExists) {
        throw Error("El producto NO existe");
      }
      if (!cart.products.length > 1) {
        return cart.products.push(newProduct);
      }

      const product = cart.products.find((product) => product.id === productId);
      if (!product) {
        return cart.products.push(newProduct);
      }
      return cart.products.push({ ...newProduct, qty: product.qty++ });
    } catch (error) {
      console.log(error);
    }
  }
  //   async getProducts() {
  //     try {
  //       await this.loadProducts();
  //       return this.#products;
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
}

const main = async () => {
  const cartManager = new CartManager("carts.json");
  //   await cartManager.createCart();
  await cartManager.addProduct(3, 1);
  await cartManager.getCart(3);
};
main();
