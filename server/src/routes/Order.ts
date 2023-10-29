import express from "express";
import bodyParser from "body-parser";
import OrderController from "../controllers/OrderController.js";

const router = express.Router();

router.use(bodyParser.json());

// router.get("/",CartController.viewCart);
// router.post("/add", CartController.addMedicineToCart);
// router.delete("/:medName", CartController.removeMedicineFromCart);
// router.post("/changeAmount", CartController.changeAmountofMedicineInCart);
router.get('/', OrderController.viewOrders);
router.post('/add', OrderController.addOrder);
router.put("/:orderId", OrderController.cancelOrder);

export default router;