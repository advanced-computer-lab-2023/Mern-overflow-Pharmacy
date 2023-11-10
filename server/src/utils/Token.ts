import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User.js";
import { HydratedDocument } from "mongoose";
import config from "../config/config.js";
import { UserType, UserTypesNames } from "../enums/UserTypes.js";

export interface TokenPayload {
  userId: string;
  userRole: UserType;
}

const generateToken = async (user: HydratedDocument<IUser>) => {
  const secretKey = config.jwt.secret;

  const expiresIn = "7d";

  const token = jwt.sign(
    {
      userId: user._id,
      userRole: UserTypesNames.get(user.__t),
    },
    secretKey,
    { expiresIn },
  );

  return token;
};

export const verifyToken = (token: string): boolean => {
  const secretKey = config.jwt.secret;
  try {
    const decoded = jwt.verify(token, secretKey) as TokenPayload;
    return true;
  } catch (e) {
    return false;
  }
};

export const decodeToken = (token: string): TokenPayload | null => {
  try {
    return jwt.decode(token) as TokenPayload;
  } catch (e) {
    return null;
  }
};

export default {
  generateToken,
  verifyToken,
  decodeToken,
};
