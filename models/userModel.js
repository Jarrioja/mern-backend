import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, required: true, default: "user" },
});

userSchema.plugin(mongoosePaginate);
const User = model("User", userSchema);
export { User };
