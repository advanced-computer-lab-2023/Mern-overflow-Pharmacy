import express from "express";
import bodyParser from "body-parser";
import CartController from "../controllers/CartController.js";

const router = express.Router();

router.use(bodyParser.json());

router.get("/:patientId", CartController.viewCart);
router.post("/:patientId/add", CartController.addMedicineToCart);
router.delete("/:patientId/:medName", CartController.removeMedicineFromCart);
router.post("/:patientId/changeAmount", CartController.changeAmountofMedicineInCart);
router.put("/:patientId/empty", CartController.emptyCart);

export default router;
