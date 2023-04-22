import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  products: [
    {
      _id: { type: Schema.Types.ObjectId, require: true, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],
});

const Cart = model("Cart", cartSchema);
export { Cart };
