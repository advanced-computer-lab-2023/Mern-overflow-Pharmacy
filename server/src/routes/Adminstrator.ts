import express from "express";
import bodyParser from "body-parser";
import adminstratorController from "../controllers/AdminstratorController.js";
import exp from "constants";

const router = express.Router();

router.use(bodyParser.json());


router.get("/",adminstratorController.ListAllAdmins);
router.post("/", adminstratorController.createAdminstrator);
router.delete("/:id", adminstratorController.deleteAdmin);


export default router;