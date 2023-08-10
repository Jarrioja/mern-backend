import z from 'zod';
export const createProductValidation = z.object({
  productId: z.string().max(24),
  title: z.string().nonempty().trim(),
  description: z.string().nonempty().trim(),
  code: z.string().nonempty().trim(),
  price: z.number().nonnegative().nonempty(),
  stock: z.number(),
  category: z.string().nonempty().trim(),
});
export default createProductValidation;
