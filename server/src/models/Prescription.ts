import mongoose, { Schema, Types , connect } from 'mongoose';

export interface IPrescription {
    patient: Types.ObjectId;
    doctor: Types.ObjectId;
    medicine:  Types.ObjectId[];
    date: Date;
    filled: boolean;
}

// 2. Create a Schema corresponding to the document interface.
const PrescriptionSchema = new Schema<IPrescription>({
    patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    doctor: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    medicine: [{ type: Schema.Types.ObjectId, required: false }],
    date: { type: Date, required: true },
    filled: { type: Boolean, required: true },
});

// 3. Create a Model.
const Prescription = mongoose.model<IPrescription>('Prescription', PrescriptionSchema);


export default Prescription;