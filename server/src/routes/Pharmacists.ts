import express from "express";
import bodyParser from "body-parser";
import pharmacistController from "../controllers/pharmacistController.js";
import patientController from "../controllers/PatientController.js";
import adminstratorController from "../controllers/AdminstratorController.js";

const router = express.Router();

router.use(bodyParser.json());

//GET
router.get("/", pharmacistController.listPharmacists);
router.get("/listAll", pharmacistController.listPharmacistRequests);
router.get("/viewAll", pharmacistController.listAllPharmacists);
router.get("/:id", pharmacistController.readPharmacist);

//POST
router.post("/", pharmacistController.createPharmacist);
router.post(
  "/acceptPharmacist",
  adminstratorController.acceptPharmacistRequest
);
router.post(
  "/rejectPharmacist",
  adminstratorController.rejectPharmacistRequest
);

//PUT
router.put("/:id", pharmacistController.acceptPharmacist);

//DELETE
router.delete("/:id", pharmacistController.deletePharmacist);

export default router;
