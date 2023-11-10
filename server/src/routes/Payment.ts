import express from "express";
import bodyParser from "body-parser";
import OrderController from "../controllers/OrderController.js";
import PaymentController from "../controllers/PaymentController.js";

const router = express.Router();

router.use(bodyParser.json());

//POST

router.post("/shoppingCart", PaymentController.payCCShoppingCart);

export default router;
