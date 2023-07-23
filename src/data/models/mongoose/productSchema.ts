import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { ProductProps } from "../../../interfaces/products";

const ProductSchema = new Schema({
  code: {
    type: String,
    require: true,
    unique: true,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  stock: {
    type: Number,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  thumbnails: {
    type: Array,
  },
});
ProductSchema.plugin(mongoosePaginate);
interface ProductDocument extends Document, ProductProps {}
const productSchema = model("Product", ProductSchema)<ProductDocument>;
export default productSchema;
