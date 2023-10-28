import mongoose, {Schema, model} from "mongoose";

// interface CartObject {
//     medicine: typeof mongoose.Types.ObjectId;
//     quantity: number;
// }

// interface ICart {
//     patient: typeof mongoose.Types.ObjectId;
//     cartObjects: CartObject[];
// }

// const cartSchema = new Schema<ICart>({
//     patient: { type: mongoose.Types.ObjectId, required: true, ref: "Patient", unique:true },
//     cartObjects: [{type: mongoose.Types.ObjectId, required: true}]
// })

interface CartObject {
    medName: String;
    medPrice: Number;
    medQuantity: Number;
}

interface ICart {
    patient: typeof mongoose.Types.ObjectId;
    medicines: CartObject[];
}

const cartSchema = new Schema<ICart>({
    patient: { type: mongoose.Types.ObjectId, required: true, ref: "Patient", unique:true },
    medicines: [{
        medName: { type: String, required: true, },
        medPrice: { type: Number, required: true, },
        medQuantity: { type: Number,required: true,},
    },],
})

const Cart = model<ICart>('Cart', cartSchema);

export default mongoose.model<ICart>("Cart", cartSchema);
