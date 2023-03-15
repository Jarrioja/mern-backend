const fs = require("fs");

class ProductManager {
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
    console.log(this.#products);
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
      const product = this.#products.find((p) => p.id === productId);
      if (!product) {
        throw Error("El producto NO existe");
      }
      console.log(product);
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

const main = async () => {
  const productManager = new ProductManager("products.json");
  await productManager.getProducts();
  await productManager.addProduct({
    title: "Producto 1",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  });

  await productManager.addProduct({
    title: "Producto 2",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc1233",
    stock: 25,
  });

  await productManager.addProduct({
    title: "Producto 3",
    description: "Este es un producto prueba",
    price: 5400,
    thumbnail: "Sin imagen",
    code: "abc33",
    stock: 5,
  });

  await productManager.updateProductById(1, {
    title: "Producto 1 Actualizado",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 2,
  });
  await productManager.removeProductById(2);

  console.log("\n#### Validando errores #####");
  console.log("# Añadir producto con codigo existente");
  await productManager.addProduct({
    title: "Producto 1",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  });
  console.log("# Buscar producto inexistente");
  await productManager.getProductsById(50);

  console.log("# Actualizar producto inexistente");
  await productManager.updateProductById(50);

  console.log("# Eliminar producto inexistente");
  await productManager.removeProductById(50);
};
main();
