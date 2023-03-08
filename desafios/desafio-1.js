class ProductManager {
  #products = [];
  idAuto = 1;

  getProducts() {
    return this.#products;
  }

  addProduct(product) {
    const sameCode = this.#products.find((p) => p.code === product.code);
    if (sameCode) {
      return console.log("El codigo del producto esta repetido");
      // throw Error("El codigo del producto esta repetido");
    }
    this.#products.push({
      ...product,
      id: this.idAuto,
    });
    this.idAuto++;
    return console.log("Producto Añadido");
  }

  getProductsById(productId) {
    const product = this.#products.find((p) => p.id === productId);
    if (!product) {
      return console.log("El producto NO existe");
      //throw Error("El producto NO existe");
    }
    console.log(product);
  }
}

// Se creará una instancia de la clase “ProductManager”
console.log("####");
const productManager = new ProductManager();
console.log("Creada la instancia");

// Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
console.log("\n####");
products = productManager.getProducts();
console.log(products);

// Se llamará al método “addProduct” | El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE */
console.log("\n####");
productManager.addProduct({
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25,
});

// Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
console.log("\n####");
products = productManager.getProducts();
console.log(products);

// Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
console.log("\n####");
productManager.addProduct({
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25,
});

// Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
console.log("\n####");
productManager.getProductsById(3);
