import express from "express";
import bodyParser from "body-parser";
import patientController from "../controllers/PatientController.js";
import pharmacistController from "../controllers/pharmacistController.js";

const router = express.Router();
router.use(bodyParser.json());

router.get("/", patientController.listPatients);
router.get("/:id", patientController.readPatient);
router.post("/", patientController.createPatient);
router.delete("/:id", patientController.deletePatient);
router.get("/address/:patientId", patientController.viewAddresses);
router.put("/address/:patientId", patientController.addAddress);

export default router;