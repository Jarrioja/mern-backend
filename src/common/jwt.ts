import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = async (user: object) => {
  return await jwt.sign(
    {
      user: {
        ...user,
        password: undefined,
      },
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );
};

export const decodeToken = async (token: string) => {
  return await jwt.verify(token, process.env.JWT_SECRET as string);
};
