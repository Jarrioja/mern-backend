import { Schema, model } from "mongoose";

const CartSchema = new Schema({
  products: [
    {
      product: { type: Schema.Types.ObjectId, require: true, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],
});
// CartSchema.pre(["find", "findOne"], function () {
//   this.populate(["products.product"]);
// });
const cartSchema = model("Cart", CartSchema);
export default cartSchema;
