import { Request, Response } from "express";
import Cart from "../models/Cart.js";
import Stripe from "stripe";
import Patient from "../models/Patient.js";
const stripe = new Stripe(
  "sk_test_51O9bKeHqEqnZHrbzSpBS6JOvMryqZfvDolGqcPDOb19E9gXdSe3rKy5UbUgCOmqLVFyHxn1U0Fp7G3IFujKuYhn500g0lhxoDO"
);

const payCCShoppingCart = async (req: Request, res: Response) => {
  try {
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
            unit_amount: item.medPrice,
          },
          quantity: item.medQuantity,
        };
      }),
      success_url: `http://localhost:3000`,
      cancel_url: `http://localhost:3000`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json(e);
  }
};

const payWalletShoppingCart = async (req: Request, res: Response) => {
  // assuming id of logged in user  comes from req.body but should come from login session
  const userId = req.body.id;
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
    if (totalAmount != undefined && walletValue != undefined) {
      if (walletValue < totalAmount) {
        res
          .status(400)
          .json(
            "Payment cannot be completed because credit not in wallet : Amount to be paid  " +
              totalAmount +
              " current wallet balance " +
              walletValue
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
          options
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
