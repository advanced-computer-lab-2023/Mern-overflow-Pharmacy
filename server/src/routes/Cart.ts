import express from "express";
import bodyParser from "body-parser";
import CartController from "../controllers/CartController.js";

const router = express.Router();

router.use(bodyParser.json());

router.get("/",CartController.viewCart);
router.post("/add", CartController.addMedicineToCart);
router.delete("/:medName", CartController.removeMedicineFromCart);

export default router;