import { Product } from "../../models/productModel.js";

export default class ProductMongoDao {
  async find({ limit, sort, category, status, page }) {
    let paginateQuery = {};
    if (category) {
      paginateQuery = { ...paginateQuery, category: category };
    }
    if (status) {
      paginateQuery = { ...paginateQuery, status: status };
    }
    let sortQuery;
    sort === "asc" ? (sortQuery = 1) : sort === "desc" ? (sortQuery = -1) : {};

    const paginateOptions = {
      page: page || 1,
      limit: limit || 10,
      sort: { price: sortQuery || -1 },
    };

    const productDocuments = await Product.paginate(
      paginateQuery,
      paginateOptions
    );
    productDocuments.nextLink = null;
    productDocuments.prevLink = null;
    if (productDocuments.hasNextPage) {
      productDocuments.nextLink = `/api/products/?page=${
        productDocuments.nextPage
      }&limit=${limit}&sort=${sort}&category=${category || ""}&status${
        status || ""
      }`;
    }
    if (productDocuments.hasPrevPage) {
      productDocuments.prevLink = `/api/products/?page=${
        productDocuments.prevPage
      }&limit=${limit}&sort=${sort}&category=${category || ""}&status${
        status || ""
      }`;
    }
    return {
      products: productDocuments.docs.map((document) => ({
        id: document._id,
        code: document.code,
        title: document.title,
        description: document.description,
        price: document.price,
        status: document.status,
        stock: document.stock,
        category: document.category,
        thumbnails: document.thumbnails,
      })),
      pagination: {
        ...productDocuments,
        docs: undefined,
        nextLink: productDocuments.nextLink,
        prevLink: productDocuments.prevLink,
      },
    };
  }
  async findById(productId) {
    const productDocument = await Product.findById(productId);
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
  async createProduct(product) {
    const sameCode = await Product.findOne({ code: product.code });
    if (sameCode) {
      throw {
        message: "El codigo del producto ya existe",
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
  async updateUser(productId, product) {
    const options = { new: true };
    const productDocument = await Product.findByIdAndUpdate(
      productId,
      product,
      options
    );
    if (!productDocument) {
      throw { message: "El producto no existe" };
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
  async deleteUser(productId) {
    const productDocument = await Product.findByIdAndDelete(productId);
    if (!productDocument) {
      throw { message: "El producto no existe" };
    }
    return {
      id: productDocument._id,
      code: productDocument.code,
      title: productDocument.title,
    };
  }
}
