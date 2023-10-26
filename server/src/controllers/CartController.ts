import { Request, Response } from "express";
import cart from "../models/Cart.js";

const addMedicineToCart = async (req: Request, res: Response) => {
}

const viewCart = async (req: Request, res: Response) => {
    cart.find({}).then((results) => {
        res.status(200).send(results);
    }).catch((err)=>{
        res.status(400).send(err);
    })
}

const removeMedicineFromCart = async (req: Request, res: Response) => {
}

const changeAmountofMedicineInCart = async (req: Request, res: Response) => {
}

export default {
    addMedicineToCart,
    viewCart,
    removeMedicineFromCart,
    changeAmountofMedicineInCart
};