import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  products: [
    {
      product: { type: Schema.Types.ObjectId, require: true, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],
});
cartSchema.pre(["find", "findOne"], function () {
  this.populate(["products.product"]);
});
const Cart = model("Cart", cartSchema);
export { Cart };
