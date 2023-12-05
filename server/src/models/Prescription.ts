import mongoose, { Schema, Types , connect } from 'mongoose';

interface IMedicine {
    medId: Types.ObjectId;
    dailyDosage: number;
}

export interface IPrescription {
    patient: Types.ObjectId;
    doctor: Types.ObjectId;
    medicine: IMedicine[];
    date: Date;
    filled: boolean;
}

// 2. Create a Schema corresponding to the document interface.
const PrescriptionSchema = new Schema<IPrescription>({
    patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    doctor: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    medicine: [ { medId: { type: Schema.Types.ObjectId, ref: "Medicine", required: true }, dailyDosage: { type: Number, required: true } } ],
    date: { type: Date, required: true, default: Date.now },
    filled: { type: Boolean, required: true, default: false },
});

// 3. Create a Model.
const Prescription = mongoose.model<IPrescription>('Prescription', PrescriptionSchema);


export default Prescription;