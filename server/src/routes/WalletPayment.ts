import express from "express";
import bodyParser from "body-parser";
import OrderController from "../controllers/OrderController.js";
import PaymentController from "../controllers/PaymentController.js";

const router = express.Router();

router.use(bodyParser.json());

router.post("/shoppingCart", PaymentController.payWalletShoppingCart);
export default router;
