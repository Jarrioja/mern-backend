import { body } from "express-validator";
const validateProduct = [
  body("title").trim().notEmpty(),
  body("description").trim().notEmpty(),
  body("code").trim().notEmpty(),
  body("price").isNumeric().toFloat(),
  body("stock").isNumeric().toInt(),
  body("category").trim().notEmpty(),
];

export { validateProduct };
