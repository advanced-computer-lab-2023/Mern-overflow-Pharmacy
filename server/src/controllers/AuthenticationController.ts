import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";
// import Patient, { IPatient } from '../models/Patient.js'; // Import your Patient model
import User, { IUser } from "../models/User.js";
import TokenUtils from "../utils/Token.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import sendMailService from "../services/emails/sendMailService.js";

const login = async (req: Request, res: Response) => {
  const { username, passwordHash } = req.body;
  console.log(username, passwordHash);
  try {
    const user: HydratedDocument<IUser> | null = await User.findOne({
      username,
      passwordHash,
    });
    console.log(user);
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

const changePassword = async (req: Request, res: Response) => {
  const newPasswordHash = req.body.newPasswordHash;
  const oldPassswordHash = req.body.oldPasswordHash;

  const token = req.cookies.authorization;
  const decodedToken = TokenUtils.decodeToken(token); // TODO handle verification before decoding

  try {
    const user = await User.findById(decodedToken?.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.passwordHash != oldPassswordHash) {
      return res.status(401).json({ message: "wrong password" });
    }
    user.passwordHash = newPasswordHash;
    await user.save();
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .json({ message: "Unauthorized - Invalid token signature" });
  }

  return res.status(200).json({ message: "changed password succesfully" });
};

const requestPasswordReset = async (req: Request, res: Response) => {
  const email = req.body.email;

  try {
    const user: HydratedDocument<IUser> | null = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ userId: user._id }, config.jwt.secret, {
      expiresIn: "5m",
    });

    const subject = "Password Reset Token";
    const html = `<p>Click the following link to reset your password: <a href="http://localhost:3000/reset/${token}">Reset Password</a></p>`;

    sendMailService.sendMail(email, subject, html);
    res.status(200).json({ message: "Password reset token sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const resetPasswordWithToken = async (req: Request, res: Response) => {
  const token = req.params.token;
  const newPasswordHash = req.body.newPassword;

  try {
    const decodedToken: any = jwt.verify(token, config.jwt.secret);

    if (!decodedToken) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const user = await User.findById(decodedToken?.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.passwordHash = newPasswordHash;
    await user.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default {
  login,
  logout,
  changePassword,
  requestPasswordReset,
  resetPasswordWithToken,
};
