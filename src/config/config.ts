import dotenv from "dotenv";

dotenv.config();
export const config = {
  BASE_URL: process.env.BASE_URL || 3000,
};
