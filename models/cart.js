import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  products: [
    {
      id: { type: Schema.Types.ObjectId, require: true, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],
});
module.exports = model("Cart", cartSchema);
