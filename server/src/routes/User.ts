
import express from "express";



// import allUsers from "../controllers/UserControllers.js";
// import registerUser from "../controllers/UserControllers.js";

import UserControllers from "../controllers/UserControllers.js";

// const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(UserControllers.allUsers);
router.route("/").post(UserControllers.registerUser);

//router.post("/login", authUser);


export default router

