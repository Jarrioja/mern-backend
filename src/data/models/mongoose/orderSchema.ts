import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const OrderSchema = new Schema({
  purchaser: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

OrderSchema.plugin(mongoosePaginate);
const orderSchema = model("Order", OrderSchema);
export default orderSchema;
