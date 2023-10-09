import mongoose, {Schema, model} from "mongoose";


interface IPharmacist {
    username:string;
    name: string;
    email: string;
    passwordHash: string;
    dateOfBirth: Date;
    hourlyRate: number;
    affiliation: string;
    education: string;
    status: string;
}

const pharmacistShema = new Schema<IPharmacist>({
    username: { type: String, required: true , unique: true },
    name: { type: String, required: true , trim: true },
    email: { type: String, required: true, match : [/\S+@\S+\.\S+/, "invalid email"], },
    passwordHash:{ type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    hourlyRate: { type: Number, required: true },
    affiliation: { type: String, required: true , trim: true },
    education: { type: String, required: true , trim: true },
    status: { type: String, required: true , lowercase: true, enum: ['pending', 'accepted', 'rejected'] },
})

const pharmacist = model<IPharmacist>('pharmacist', pharmacistShema);


export default mongoose.model<IPharmacist>('pharmacist', pharmacistShema);



