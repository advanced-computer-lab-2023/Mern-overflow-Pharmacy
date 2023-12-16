import mongoose, { Schema, model } from "mongoose";

interface CartObject {
    medName: String;
    medPrice: number;
    medQuantity: number;
}

interface ICart {
    patient: typeof mongoose.Types.ObjectId;
    medicines: CartObject[];
}

const cartSchema = new Schema<ICart>({
    patient: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Patient",
        unique: true
    },
    medicines: [
        {
            medName: { type: String, required: true },
            medPrice: { type: Number, required: true },
            medQuantity: { type: Number, required: true }
        }
    ]
});

const Cart = model<ICart>("Cart", cartSchema);

export default mongoose.model<ICart>("Cart", cartSchema);
