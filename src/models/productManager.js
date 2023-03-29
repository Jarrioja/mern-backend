import fs from "fs";
export default class ProductManager {
  #products;
  #idAuto = 1;
  constructor(path) {
    this.#products = [];
    this.path = path;
    if (!fs.existsSync(this.path)) {
      fs.promises.writeFile(this.path, "[]");
    }
  }

  async readFile() {
    try {
      const products = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(products);
    } catch (error) {
      console.log(`Archivo ${this.path} no existe, creando...`);
      await fs.promises.writeFile(this.path, "[]");
    }
  }

  async updateFile(newProductData) {
    await fs.promises.writeFile(this.path, JSON.stringify(newProductData));
  }

  async loadProducts() {
    this.#products = await this.readFile();
  }

  async getProducts() {
    try {
      await this.loadProducts();
      return this.#products;
    } catch (err) {
      console.log(err);
    }
  }

  async addProduct({ title, description, price, thumbnail, code, stock }) {
    try {
      if (
        title === undefined ||
        description === undefined ||
        price === undefined ||
        thumbnail === undefined ||
        code === undefined ||
        stock === undefined
      ) {
        throw new Error("Faltan datos del producto");
      }
      const sameCode = this.#products.find((p) => p.code === code);
      if (sameCode) {
        throw Error("El codigo del producto esta repetido");
      }
      const product = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        id: this.#idAuto,
      };

      this.#products.push(product);
      await this.updateFile(this.#products);
      this.#idAuto++;
      console.log(`Producto con id ${product.id} creado correctamente.`);
    } catch (error) {
      console.log(error);
    }
  }

  async getProductsById(productId) {
    try {
      const products = await this.readFile();
      const product = products.find((p) => p.id === productId);
      if (!product) {
        throw Error("El producto NO existe");
      }
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProductById(productId, newProductData) {
    try {
      const index = this.#products.findIndex((p) => p.id === productId);
      if (index < 0) {
        throw Error(`No se encontró ningún producto con id ${productId}.`);
      }
      this.#products[index] = { ...newProductData, id: productId };
      await this.updateFile(this.#products);
      console.log(`Producto con id ${productId} actualizado correctamente.`);
    } catch (error) {
      console.log(error);
    }
  }

  async removeProductById(productId) {
    try {
      const index = this.#products.findIndex((p) => p.id === productId);
      if (index < 0) {
        throw Error(`No se encontró ningún producto con id ${productId}.`);
      }
      this.#products.splice(index, 1);
      await this.updateFile(this.#products);
      console.log(`Producto con id ${productId} eliminado correctamente.`);
    } catch (error) {
      console.log(error);
    }
  }
}
