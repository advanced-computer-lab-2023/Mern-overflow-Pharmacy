import mongoose, { Schema, model, connect, Types } from "mongoose";
import User from "./User.js";

interface emergencyContact {
  name: string;
  mobileNumber: string;
  relation: string;
}

interface familyMember {
  name: string;
  nationalId: string;
  patientId: Types.ObjectId;
  gender: string;
  relation: string;
}

interface document {
  filename: string;
  path: string;
}

interface IPatient {
  // username: string;
  name: string;
  // email: string;
  nationalId: string;
  // passwordHash: string;
  dateOfBirth: Date;
  gender: string;
  mobileNumber: string;
  emergencyContact: emergencyContact;
  files?: document[];
  familyMembers?: familyMember[];
  revFamilyMembers?: Types.ObjectId[];
  prescriptions?: Types.ObjectId[];
  package?: Types.ObjectId;
  //packageSubscribed?: Types.ObjectId;
  subscribedToPackage?: boolean;
  packageRenewalDate?: Date;
  healthRecords?: Types.ObjectId[];
  address?: string[];
  wallet?: number;
}

// 2. Create a Schema corresponding to the document interface.
const PatientSchema = new Schema<IPatient>({
  // username: { type: String, required: true, unique: true },
  name: { type: String, lowercase: true, required: true, trim: true },
  // email: { type: String, required: true, unique: true, match: [/\S+@\S+\.\S+/, "invalid email"], },
  nationalId: { type: String, required: true },
  // passwordHash: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: {
    type: String,
    required: true,
    lowercase: true,
    enum: ["male", "female"],
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
    min: 8,
    max: 16,
    match: [/^(\+\d{8,15}|\d{8,15})$/, "invalid charachters"],
  },
  emergencyContact: {
    name: { type: String, required: true, trim: true },
    mobileNumber: {
      type: String,
      required: true,
      min: 8,
      max: 16,
      match: [/^(\+\d{8,15}|\d{8,15})$/, "invalid charachters"],
    },
    relation: {
      type: String,
      required: true,
      trim: true,
      enum: ["wife", "husband", "parent", "child", "sibling"],
    },
  },
  files: [
    {
      filename: { type: String, required: true, trim: true, unique: true },
      path: { type: String, required: true, trim: true },
    },
  ],
  familyMembers: [
      {
          name: { type: String, required: true, trim: true },
          nationalId: { type: String, required: true },//TODO add validation
          patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
          //dateOfBirth: { type: Date, required: true, min: 0, max: 122 },
          gender: { type: String, required: true, lowercase: true, enum: ['male', 'female'] },
          relation: { type: String, required: true, lowercase: true, enum: ['wife', 'husband', 'parent', 'child', 'sibling'] },
          // package: { type: mongoose.Types.ObjectId, ref: "Package", required: false },
      }
  ],
  revFamilyMembers: [{ type: Schema.Types.ObjectId, ref: "Patient", required: false }],
  prescriptions: [
    { type: mongoose.Types.ObjectId, ref: "Prescription", required: false },
  ],
  package: { type: mongoose.Types.ObjectId, ref: "Package", required: false },
  subscribedToPackage: { type: Boolean, required: false },
  packageRenewalDate: { type: Date, required: false },
  healthRecords: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HealthRecord",
      required: false,
    },
  ],
  address: [{ type: String, required: false, trim: true }],
  wallet: { type: Number, required: false },
});

// 3. Create a Model.
// const Patient = model<IPatient>('Patient', PatientSchema);
const Patient = User.discriminator<IPatient>("Patient", PatientSchema);

// let p;
// export async function f():Promise<any> {
//     await connect(mongoUrl);
//     p = await User.deleteMany({name:'Ahmed'}).exec();
//     console.log(p);
// }

// run().catch(err => console.log(err));

export default Patient;
