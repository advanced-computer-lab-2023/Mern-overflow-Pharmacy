import express from "express";
import bodyParser from "body-parser";
import adminstratorController from "../controllers/AdminstratorController.js";
import isAuthenticated from "../middlewares/permissions/isAuthenticated.js";
import isAuthorized from "../middlewares/permissions/isAuthorized.js";
import { UserTypesNames } from "../enums/UserTypes.js";
const router = express.Router();

router.use(bodyParser.json());


router.get("/",isAuthenticated,adminstratorController.ListAllAdmins);
router.post("/", adminstratorController.createAdminstrator);
router.delete("/:id", adminstratorController.deleteAdmin);


export default router;