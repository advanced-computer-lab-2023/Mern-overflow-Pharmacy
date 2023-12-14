import express from "express";
import bodyParser from "body-parser";
import OrderController from "../controllers/OrderController.js";

const router = express.Router();

router.use(bodyParser.json());

router.get("/salesreport", OrderController.viewSales);
router.get("/:patientId", OrderController.viewOrders);
router.post("/:patientId/add", OrderController.addOrder);
router.put("/:orderId", OrderController.cancelOrder);

export default router;
