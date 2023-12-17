import express from "express";
import bodyParser from "body-parser";
import PaymentController from "../controllers/PaymentController.js";

const router = express.Router();

router.use(bodyParser.json());
router.post("/", PaymentController.payCashOnDelivery);
export default router;
