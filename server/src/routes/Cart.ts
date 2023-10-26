import express from "express";
import bodyParser from "body-parser";
import CartController from "../controllers/CartController.js";

const router = express.Router();

router.use(bodyParser.json());

router.get("/",CartController.viewCart);
//router.post("/", CartController.);
//router.delete("/:id", CartController.);

export default router;