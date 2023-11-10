import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";
// import Patient, { IPatient } from '../models/Patient.js'; // Import your Patient model
import User, { IUser } from "../models/User.js";
import TokenUtils from "../utils/Token.js";

const login = async (req: Request, res: Response) => {
  const { username, passwordHash } = req.body;
  console.log(username,passwordHash);
  try {
    const user: HydratedDocument<IUser> | null = await User.findOne({
      username,
      passwordHash,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      const token = await TokenUtils.generateToken(user);
      res.cookie("authorization", token, {
        httpOnly: true, // Make the cookie accessible only via HTTP (not JavaScript)
        secure: false,
      });
      const type = user.__t;
      const userId = user._id;
      res.status(200).json({ token, type, userId });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req: Request, res: Response) => {
  res.clearCookie("authorization");
  return res.status(200).json({ message: "Logout Successful" });
};

export default {
  login,
  logout,
};
