import express from "express";
import bodyParser from "body-parser";
import authController from "../controllers/AuthenticationController.js";
import isAuthenticated from "../middlewares/permissions/isAuthenticated.js";

const router = express.Router();
router.use(bodyParser.json());

router.post("/login", authController.login);
router.post("/logout", isAuthenticated, authController.logout);
router.post("/reset", authController.requestPasswordReset);
router.post("/resetwithtoken", authController.resetPasswordWithToken);
router.post("/change", isAuthenticated, authController.changePassword);

export default router;
