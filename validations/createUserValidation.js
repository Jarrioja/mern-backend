import z from "zod";
const createUserValidation = z.object({
  email: z.string().z.email(),
  password: z.string().min(3),
  role: z.string().nonempty().trim(),
});
export default createUserValidation;
