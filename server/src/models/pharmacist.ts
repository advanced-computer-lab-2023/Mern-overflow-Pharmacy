import mongoose, {Schema, model} from "mongoose";
import User from "./User.js";


interface IPharmacist {
    // username:string;
    name: string;
    email: string;
    // passwordHash: string;
    dateOfBirth: Date;
    hourlyRate: number;
    affiliation: string;
    education: string;
    files: document[];
    status: string;
}

interface document {
    filename: string;
    path: string;
    
}

const pharmacistShema = new Schema<IPharmacist>({
    // username: { type: String, required: true , unique: true },
    name: { type: String, required: true , trim: true },
    email: { type: String, required: true, match : [/\S+@\S+\.\S+/, "invalid email"], },
    // passwordHash:{ type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    hourlyRate: { type: Number, required: true },
    affiliation: { type: String, required: true , trim: true },
    education: { type: String, required: true , trim: true },
    files: [
        {
            filename: { type: String, required: true, trim: true },
            path: { type: String, required:true, trim: true },
        }
    ],
    status: { type: String, required: true , lowercase: true, enum: ['pending', 'accepted', 'rejected'] },
})


pharmacistShema.pre('save', function (next) {
    if (this.isModified('name')) {
        this.name = this.name.toLowerCase();
    }
    if (this.isModified('email')) {
        this.email = this.email.toLowerCase();
    }
    next();
});


// const pharmacist = model<IPharmacist>('pharmacist', pharmacistShema);
const pharmacist = User.discriminator<IPharmacist>('pharmacist', pharmacistShema);


export default pharmacist



