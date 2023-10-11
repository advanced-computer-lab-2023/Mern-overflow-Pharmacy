import mongoose, { Schema, model } from "mongoose";

interface MedicineImage {
    data: Buffer;
    contentType: string;
    filename: string;
}

interface Details{
    description: string;
    activeIngrediants: string[];
}

interface Imedicine {
    name: string;
    medicinalUse: string;
    details: Details;
    price: number;
    availableQuantity: number;
    sales : number ;
    image?: MedicineImage;

}

const medicineSchema = new Schema<Imedicine>({
    name: { type: String, required: true, unique: true },
    medicinalUse: { type: String, required: true},
    details: {
        description: { type: String, required: true },
        activeIngrediants: [{ type: String, required: true }],
    },
    price: { type: Number, required: true },
    availableQuantity: { type: Number, required: true },
    sales: { type: Number, required: true },
    image: {
        // requirements of these changed to false for testing purposes 
        data: { type: Buffer, required: false, },
        contentType: { type: String, required: false, },
        filename: { type: String,required: false,},
    },
})


medicineSchema.pre('save', function (next) {
    if (this.isModified('name')) {
        this.name = this.name.toLowerCase();
    }
    if (this.isModified('medicinalUse')) {
        this.medicinalUse = this.medicinalUse.toLowerCase();
    }
    next();
});

const Medicine = model<Imedicine>('Medicine', medicineSchema);


export default mongoose.model<Imedicine>('Medicine', medicineSchema);



