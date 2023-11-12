import express from "express";
import bodyParser from "body-parser";
import adminstratorController from "../controllers/AdminstratorController.js";
import isAuthenticated from "../middlewares/permissions/isAuthenticated.js";
import isAuthorized from "../middlewares/permissions/isAuthorized.js";
import { UserType } from "../enums/UserTypes.js";
const router = express.Router();

router.use(bodyParser.json());


router.get("/",isAuthenticated,isAuthorized([UserType.ADMINSTARTOR]),adminstratorController.ListAllAdmins);
router.post("/", isAuthorized([UserType.ADMINSTARTOR]),adminstratorController.createAdminstrator);
router.delete("/:id",isAuthorized([UserType.ADMINSTARTOR]), adminstratorController.deleteAdmin);


export default router;