import mongoose, { Schema, model } from "mongoose";

interface MedicineImage {
    data: Buffer;
    contentType: string;
    filename: string;
}

interface Imedicine {
    name: string;
    details: string;
    price: number;
    availableQuantity: number;
    sales : number ;
    image?: MedicineImage;
}

const medicineSchema = new Schema<Imedicine>({
    name: { type: String, required: true, unique: true },
    details: { type: String, required: true },
    price: { type: Number, required: true },
    availableQuantity: { type: Number, required: true },
    sales: { type: Number, required: true },
    image: {
        data: { type: Buffer, required: true, },
        contentType: { type: String, required: true, },
        filename: { type: String,required: true,},
        required: false,
    },
})

const Medicine = model<Imedicine>('Medicine', medicineSchema);


export default mongoose.model<Imedicine>('Medicine', medicineSchema);



