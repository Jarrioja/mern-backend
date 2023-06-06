import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  age: { type: Number, default: 18 },
  isAdmin: { type: Boolean, default: false },
  role: { type: Schema.Types.ObjectId, index: true, ref: "Role" },
  cart: { type: Schema.Types.ObjectId, ref: "Cart" },
});
userSchema.plugin(mongoosePaginate);

userSchema.pre(["find", "findOne"], function () {
  this.populate(["role"]);
});
userSchema.pre(["find", "findOne"], function () {
  this.populate(["cart"]);
});
const User = model("User", userSchema);
export { User };
