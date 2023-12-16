import express from "express";


import messageControllers from "../controllers/messageControllers.js";
import isAuthenticated from "../middlewares/permissions/isAuthenticated.js";

const router = express.Router();

router.route("/:chatId").get(isAuthenticated,messageControllers.allMessages);
router.route("/").post(isAuthenticated,messageControllers.sendMessage);



export default router;
