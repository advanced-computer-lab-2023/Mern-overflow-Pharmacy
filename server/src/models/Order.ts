import mongoose, { Date, Schema, model } from "mongoose";

interface CartObject {
    medName: String;
    medPrice: Number;
    medQuantity: Number;
}

interface IOrder {
    patient: typeof mongoose.Types.ObjectId;
    status: String;
    date: Date;
    total: Number;
    address: String;
    paymentMethod: String;
    medicines: CartObject[];
}

const orderSchema = new Schema<IOrder>({
    patient: { type: mongoose.Types.ObjectId, required: true, ref: "Patient" },
    status: { type: String, required: true, lowercase: true, enum: ["pending", "shipped", "delievered", "cancelled"] },
    date: { type: Date, required: true },
    total: { type: Number, required: true },
    address: { type: String, required: true },
    paymentMethod: {
        type: String,
        required: true,
        lowercase: true,
        enum: ["cash on delivery", "wallet", "credit card"]
    },
    medicines: [
        {
            medName: { type: String, required: true },
            medPrice: { type: Number, required: true },
            medQuantity: { type: Number, required: true }
        }
    ]
});

const Order = model<IOrder>("Order", orderSchema);

export default mongoose.model<IOrder>("Order", orderSchema);
