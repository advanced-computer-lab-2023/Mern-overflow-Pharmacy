import mongoose, {Schema, model} from "mongoose";


interface IAdminstrator {
    username:string;
    passwordHash: string;
}

const adminstratorSchema = new Schema<IAdminstrator>({
    username: { type: String, required: true , unique: true },
    passwordHash:{ type: String, required: true },
})

const Adminstrator = model<IAdminstrator>('Adminstrator', adminstratorSchema);


export default mongoose.model<IAdminstrator>('Adminstrator', adminstratorSchema);



