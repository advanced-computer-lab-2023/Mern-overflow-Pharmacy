import mongoose, {Schema, model} from "mongoose";


interface IPackage {
    type: string;
    price: number;
    discountOnDoctorSessions: number;
    discountOnMedicine: number;
    discountForFamily: number;
}

const packageSchema = new Schema<IPackage>({
    type: { type: String, required: true , lowercase: true, enum: ['gold', 'silver', 'platinum'] },
    price: {type: Number, required: true},
    discountOnDoctorSessions: {type: Number, required: true, min:0, max:100},
    discountOnMedicine: {type: Number, required: true, min:0, max:100},
    discountForFamily: {type: Number, required: true, min:0, max:100},
})

const Package = model<IPackage>('Package', packageSchema);


export default mongoose.model<IPackage>("Package", packageSchema);



