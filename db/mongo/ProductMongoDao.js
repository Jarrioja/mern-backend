import { Product } from "../../models/product.js";

class ProductMongoDao {
  async find(limit) {
    const productDocuments = await Product.find().limit(limit);
    return productDocuments.map((document) => ({
      id: document._id,
      code: document.code,
      title: document.title,
      description: document.description,
      price: document.price,
      status: document.status,
      stock: document.stock,
      category: document.category,
      thumbnails: document.thumbnails,
    }));
  }
  async findById(id) {
    const productDocument = await Product.findById(id);
    return {
      id: productDocument._id,
      code: productDocument.code,
      title: productDocument.title,
      description: productDocument.description,
      price: productDocument.price,
      status: productDocument.status,
      stock: productDocument.stock,
      category: productDocument.category,
      thumbnails: productDocument.thumbnails,
    };
  }
  async create(product) {
    const sameCode = await Product.findOne({ code: product.code });
    if (sameCode) {
      throw {
        message: "El codigo del producto ya existe",
        statusCode: 409,
      };
    }
    const productDocument = new Product(product);
    await productDocument.save();

    return {
      id: productDocument._id,
      code: productDocument.code,
      title: productDocument.title,
      description: productDocument.description,
      price: productDocument.price,
      status: productDocument.status,
      stock: productDocument.stock,
      category: productDocument.category,
      thumbnails: productDocument.thumbnails,
    };
  }
  async update(id, product) {
    const options = { new: true };
    const productDocument = await Product.findByIdAndUpdate(
      id,
      product,
      options
    );
    if (!productDocument) {
      throw { message: "El producto no existe", statusCode: 404 };
    }

    return {
      id: productDocument._id,
      code: productDocument.code,
      title: productDocument.title,
      description: productDocument.description,
      price: productDocument.price,
      status: productDocument.status,
      stock: productDocument.stock,
      category: productDocument.category,
      thumbnails: productDocument.thumbnails,
    };
  }
  async delete(id) {
    const productDocument = await Product.findByIdAndDelete(id);
    if (!productDocument) {
      throw { message: "El producto no existe", statusCode: 404 };
    }
    return {
      id: productDocument._id,
      code: productDocument.code,
      title: productDocument.title,
    };
  }
}
export { ProductMongoDao };
