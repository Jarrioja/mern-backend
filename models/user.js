import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: { tyep: String, require: true, unique: true },
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
  },
});

const User = model("User", userSchema);
export { User };
