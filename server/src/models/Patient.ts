import mongoose, { Schema, model, connect, Types } from 'mongoose';
import User from "./User.js";
// import dotenv from 'dotenv';
//dotenv.config();

interface emergencyContact {
    name: string;
    mobileNumber: string;
}

interface IPatient {
    // username: string;
    name: string;
    email: string;
    // passwordHash: string;
    dateOfBirth: Date;
    gender: string;
    mobileNumber: string;
    emergencyContact: emergencyContact;
    prescriptions?: Types.ObjectId[];
    package?: Types.ObjectId;
    address: string[];
}

// 2. Create a Schema corresponding to the document interface.
const PatientSchema = new Schema<IPatient>({
    // username: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, match: [/\S+@\S+\.\S+/, "invalid email"], },
    // passwordHash: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true, lowercase: true, enum: ['male', 'female'] },
    mobileNumber: { type: String, required: true, unique: true, min: 8, max: 16, match: [/^(\+\d{8,15}|\d{8,15})$/, "invalid charachters"] },
    emergencyContact:
    {
        name: { type: String, required: true, trim: true },
        mobileNumber: { type: String, required: true, min: 8, max: 16, match: [/^(\+\d{8,15}|\d{8,15})$/, "invalid charachters"] },
        relation: { type: String, required: true, trim: true, enum: ['wife', 'husband', 'child'] },
    }
    ,

    prescriptions: [{ type: mongoose.Types.ObjectId, ref: "Prescription", required: false }],
    package: { type: mongoose.Types.ObjectId, ref: "Package", required: false },
    address: [{type: String, trim: true}]
});

PatientSchema.pre('save', function (next) {
    if (this.isModified('name')) {
        this.name = this.name.toLowerCase();
    }
    if (this.isModified('email')) {
        this.email = this.email.toLowerCase();
    }
    next();
});

// 3. Create a Model.
// const Patient = model<IPatient>('Patient', PatientSchema);
const Patient = User.discriminator<IPatient>('Patient', PatientSchema);


// let p;
// export async function f():Promise<any> {
//     await connect(mongoUrl);
//     p = await User.deleteMany({name:'Ahmed'}).exec();
//     console.log(p);
// }






// run().catch(err => console.log(err));

export default Patient
