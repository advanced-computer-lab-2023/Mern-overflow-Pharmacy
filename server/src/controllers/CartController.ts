import { Request, Response } from "express";
import cart from "../models/Cart.js";

const addMedicineToCart = async (req: Request, res: Response) => {
    // const id = req.params.id;
    // const query = { _id: id };

    // const medicine = req.body.medicine;
    // const quantity = req.body.quantity;

    // const update: { [key: string]: any } = {};
    // if (details !== undefined) update["details"] = details;
    // if (price !== undefined) update["price"] = price;


    // medicine
    //     .findOneAndUpdate(query, update, { new: true })
    //     .then((updatedMed) => {
    //         if (updatedMed) {
    //             res.status(200).send(updatedMed);
    //         }
    //     })
    //     .catch((error) => {
    //         res.status(400).send(error);
    //     });
}

// const createAdminstrator = async(req:Request, res:Response)=>{
//     const entry = adminstrator.find({ 'username': req.body.username }).then((document) => {
//       if (document.length === 0) {

//         const newAdmin = adminstrator
//         .create(req.body)
//         .then((newAdmin) => {
//             res.status(200).json(newAdmin);
//         })
//         .catch((err) => {
//             res.status(400).json(err);
//         });

//       }
//       else if (document.length !== 0)
//           res.status(400).send("username taken , please choose another one ");
//   })
// }

// const createMedicine = async (req: Request, res: Response) => {
//     //add a medicine with its details (active ingredients) , price and available quantity 
//     try {
//       if (req.body.availableQuantity === 0)
//         res.status(400).send("cannot add medicine with 0 available quantity");
//       else {
//         const NewMedecine = await medicine.create(req.body);
//         res.status(200).send(NewMedecine);
//       }
//     } catch (error) {
//       res.status(400).send(error);
//       console.log(error)
//     }
//   }

const viewCart = async (req: Request, res: Response) => {
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