import express from "express";
import bodyParser from "body-parser";
import patientController from "../controllers/PatientController.js";
import pharmacistController from "../controllers/pharmacistController.js";
import isAuthenticated from "../middlewares/permissions/isAuthenticated.js";
import isAuthorized from "../middlewares/permissions/isAuthorized.js";
import { UserType } from "../enums/UserTypes.js";
const router = express.Router();
router.use(bodyParser.json());

router.get("/", isAuthenticated, isAuthorized([UserType.ADMINSTARTOR]), patientController.listPatients);
router.get("/:id", patientController.readPatient);
router.post("/", patientController.createPatient);
router.delete("/:id", patientController.deletePatient);
router.get("/address/:patientId", patientController.viewAddresses);
router.put("/address/:patientId", patientController.addAddress);

router.get("/chatWithPharmacists/:id/:search",isAuthenticated,isAuthorized([UserType.PATIENT]),patientController.chatWithPharmacists);
router.get("/getAllMyPharmacists/:id",isAuthenticated,isAuthorized([UserType.PATIENT]),patientController.getAllMyPharmacists);
router.get("/:id/info", patientController.viewPatientInfo);

export default router;
