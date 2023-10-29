import { Request, Response } from "express";
import carts from "../models/Cart.js";

const addMedicineToCart = async (req: Request, res: Response) => {
    const { medName, medPrice, medQuantity } = req.body;
    try {
        const cart = await carts.findOne({ patient: "6527d5aa11c64e3b65860e67" });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const existingMedicine = cart.medicines.find(med => med.medName === medName);

        if (existingMedicine) {
            existingMedicine.medQuantity += medQuantity;
        } else {
            const newMedicine = {
                medName,
                medPrice,
                medQuantity,
            };
            cart.medicines.push(newMedicine);
        }
        await cart.save();
        res.json({ message: 'Medicine added to cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const viewCart = async (req: Request, res: Response) => {
    carts.find({}).then((results) => {
        res.status(200).send(results);
    }).catch((err) => {
        res.status(400).send(err);
    })
}

const removeMedicineFromCart = async (req: Request, res: Response) => {
    const medName = req.params.medName;
    try {
        //const cart = await carts.findOne({ patient: req.user._id }); // Assuming you have user authentication and req.user contains the patient's ID
        const cart = await carts.findOne({ patient: "6527d5aa11c64e3b65860e67" });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const updatedMedicines = cart.medicines.filter(med => med.medName !== medName);
        await carts.findOneAndUpdate(
            { patient: "6527d5aa11c64e3b65860e67" },
            { medicines: updatedMedicines },
            { new: true }
        );
        res.json({ message: 'Medicine removed from cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const changeAmountofMedicineInCart = async (req: Request, res: Response) => {
    const { medName, newAmount } = req.body;

    try {
        const cart = await carts.findOne({ patient: "6527d5aa11c64e3b65860e67" });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const existingMedicine = cart.medicines.find(med => med.medName === medName);

        if (existingMedicine) {
            if (newAmount > 100) {
                return res.status(400).send("Quantity cannot be more than 100.");
            } else if (newAmount < 1) {
                return res.status(400).send("Quantity cannot be less than 1.");
            } else {
                existingMedicine.medQuantity = Number(newAmount);
            }
        } else {
            return res.status(404).json({ message: 'Medicine not found in cart' });
        }
        await cart.save();
        res.json({ message: 'Medicine quantity updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export default {
    addMedicineToCart,
    viewCart,
    removeMedicineFromCart,
    changeAmountofMedicineInCart
};