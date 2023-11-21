import express from "express";
import bodyParser from "body-parser";
import medicineController from "../controllers/medicineController.js";

const router = express.Router();
router.use(bodyParser.json());


//GET
router.get("/viewAll", medicineController.listAllMedicines);
router.get("/view", medicineController.listMedicines);
router.get("/", medicineController.readMedicine);
router.get("/search", medicineController.searchMedicineByName);
router.post("/filter", medicineController.filterMedicines);

//POST
router.post("/", medicineController.createMedicine);

//PUT
router.put("/:id", medicineController.updateMedicine);
router.put("/:id/archive", medicineController.archiveMedicine);

export default router;