import { Request, Response } from "express";
import carts from "../models/Cart.js";
import Cart from "../models/Cart.js";
import Stripe from "stripe";
import Patient from "../models/Patient.js";
import orders from "../models/Order.js";
import { HydratedDocument } from "mongoose";
import medicine, { Imedicine } from "../models/medicine.js";
import pharmacist from "../models/pharmacist.js";
import sendMailService from "../services/emails/sendMailService.js";
const stripe = new Stripe(
  "sk_test_51O9bKeHqEqnZHrbzSpBS6JOvMryqZfvDolGqcPDOb19E9gXdSe3rKy5UbUgCOmqLVFyHxn1U0Fp7G3IFujKuYhn500g0lhxoDO",
);

const payCCShoppingCart = async (req: Request, res: Response) => {
  try {
    console.log(req.body.pId);
    const cartId = (await Cart.find({ patient: req.body.pId }))[0]._id;
    const meds = (await Cart.findById(cartId))?.medicines;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: meds?.map((item: any) => {
        return {
          price_data: {
            currency: "EGP",
            product_data: {
              name: item.medName,
            },
            unit_amount: item.medPrice * 100,
          },
          quantity: item.medQuantity,
        };
      }),
      success_url: `http://localhost:3000/patient/orders`,
      cancel_url: `http://localhost:3000/patient/checkout`,
    });

    const { medicines, total, address } = req.body;
    const paymentMethod = "Credit Card";

    const patientId = req.body.pId;
    console.log("HII");
    console.log(medicines, total, address, paymentMethod, patientId);
    try {
      for (const med of medicines) {
        const med2: HydratedDocument<Imedicine> | null = await medicine.findOne(
          { name: med.medName },
        );
        if (!med2) {
          return;
        }
        med2.availableQuantity -= med.medQuantity; //TODO names

        if (med2.availableQuantity === 0) {
          const subject = "Medicince Out of Stock";
          let html = `Hello pharmacist, <br /> The medicine ${med2.name} is out of stock. <br /> Try to order new stock ASAP. <br /> With Love, <br /> El7a2ni Pharmacy xoxo.`;
          sendMailService.sendMail(
            "ahmedwael216@protonmail.com",
            subject,
            html,
          );
        }
        await med2.save();
      }
      const order = new orders({
        patient: patientId,
        status: "pending",
        date: new Date(),
        total: total,
        address: address,
        paymentMethod: paymentMethod,
        medicines: medicines,
      });

      await order.save();
    } catch (error) {
      console.error(error);
    }

    try {
      const cart = await carts.findOne({ patient: patientId });
      if (!cart) {
        return;
      }
      cart.medicines = [];
      await cart.save();
    } catch (error) {
      console.error(error);
    }

    ///post(`http://localhost:8000/orders/${req.body.pId}/add`, { medicines:req.body.meds, total:req.body.total, address:req.body.address, paymentMethod:"Credit Card" })
    //put(`http://localhost:8000/cart/${req.body.pId}/empty`)
    res.json({ url: session.url });
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

const payWalletShoppingCart = async (req: Request, res: Response) => {
  // assuming id of logged in user  comes from req.body but should come from login session
  const userId = req.body.id;
  console.log("user id " + userId);
  const userCart = Cart.find({ patient: userId }).then(async (result) => {
    var totalAmount = 0;
    for (const med of result[0].medicines) {
      totalAmount += med.medPrice * med.medQuantity;
    } // TODO:to be cnahged to be taken from the logged in session

    // TODO: Display these messages  in the fe
    // assumimg id of user is given through req.body
    //TODO:UPDATE ID to be taken from logined in session
    // assuming patient id is took from logged in session
    const pat = await Patient.findById(userId);
    const walletValue = pat?.wallet;
    console.log(walletValue + " " + totalAmount);
    if (totalAmount != undefined && walletValue != undefined) {
      if (walletValue < totalAmount) {
        res
          .status(400)
          .json(
            "Payment cannot be completed because credit not in wallet : Amount to be paid  " +
              totalAmount +
              " current wallet balance " +
              walletValue,
          );
      } else {
        const update = {
          // Define the fields you want to update and their new values
          wallet:
            walletValue && totalAmount ? walletValue - totalAmount : undefined,
        };

        // Set options for the update
        const options = {
          new: true, // Return the updated document after the update
        };

        // Use findOneAndUpdate to find and update the document
        const filter = { _id: userId };
        const updateWallet = await Patient.findOneAndUpdate(
          filter,
          update,
          options,
        );

        const newWallet =
          walletValue && totalAmount ? walletValue - totalAmount : undefined;
        res
          .status(200)
          .json("Payment successful , new wallet value :" + newWallet);
      }
    } else {
      if (!totalAmount) res.status(404).send("totalAmount is undefined");
      else res.status(404).send("wallet is undefined");
    }
  });
};
export default {
  payCCShoppingCart,
  payWalletShoppingCart,
};
