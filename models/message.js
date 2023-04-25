import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  content: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});
const Message = model("Message", messageSchema);
export { Message };
