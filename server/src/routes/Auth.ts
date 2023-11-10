import express from "express";
import bodyParser from "body-parser";
import authController from "../controllers/AuthenticationController.js";
import isAuthenticated from "../middlewares/permissions/isAuthenticated.js";

const router = express.Router();
router.use(bodyParser.json());

router.post("/login", authController.login);
router.post("/logout", isAuthenticated, authController.logout);

export default router;

