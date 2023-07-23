import bcrypt from "bcrypt";

export const createHash = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const isValidPassword = async (
  password: string,
  passwordHash: string
) => {
  return await bcrypt.compare(password, passwordHash);
};