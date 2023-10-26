import mongoose, { Schema, model } from "mongoose";

interface CartObject {
    medicine: typeof mongoose.Types.ObjectId;
    quantity: number;
}

interface ICart {
    patient: typeof mongoose.Types.ObjectId;
    cartObjects: CartObject[];
}

interface IOrder {
    patient: typeof mongoose.Types.ObjectId;
    status: string;
    //objects: 
}

const orderSchema = new Schema<IOrder>({
    status: { type: String, required: true, lowercase: true, enum: ['pending', 'shipped', 'delievered', 'cancelled'] },
})


const Order = model<IOrder>('Order', orderSchema);

export default mongoose.model<IOrder>("Order", orderSchema);
