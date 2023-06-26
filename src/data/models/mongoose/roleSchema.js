import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const RoleSchema = new Schema({
  name: { type: Schema.Types.String, required: true },
  permissions: [{ type: Schema.Types.String }],
});
RoleSchema.plugin(mongoosePaginate);
const roleSchema = model("Role", RoleSchema);
export { roleSchema };
