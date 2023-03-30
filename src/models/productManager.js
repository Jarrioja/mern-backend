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
      return [];
    }
  }

  async updateFile(newProductData) {
    await fs.promises.writeFile(this.path, JSON.stringify(newProductData));
  }

  async loadProducts() {
    return (this.#products = await this.readFile());
  }

  async getProducts() {
    try {
      await this.loadProducts();
      return this.#products;
    } catch (err) {
      console.log(err);
    }
  }

  async createProduct({
    title,
    description,
    price,
    thumbnails,
    code,
    stock,
    category,
  }) {
    try {
      if (
        title === undefined ||
        description === undefined ||
        price === undefined ||
        thumbnails === undefined ||
        code === undefined ||
        stock === undefined ||
        category === undefined
      ) {
        throw new Error("Faltan datos del producto");
      }
      const sameCode = this.#products.find((p) => p.code === code);
      if (sameCode) {
        throw Error("El codigo del producto esta repetido");
      }
      const products = await this.loadProducts();
      if (!products.length) {
        this.#idAuto = 1;
      } else {
        this.#idAuto = products[products.length - 1].id + 1;
      }
      const product = {
        title,
        description,
        price,
        thumbnails,
        category,
        code,
        stock,
        id: this.#idAuto,
      };

      products.push(product);
      await this.updateFile(products);
      return `Producto con id ${product.id} creado correctamente.`;
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