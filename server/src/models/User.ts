import mongoose, {Document, Schema, model} from "mongoose";

export interface IUser extends Document {
    username:string;
    passwordHash: string;
    __t: string;
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true , unique: true },
    passwordHash:{ type: String, required: true },  
})

const User = model<IUser>('PUser', UserSchema);

export default User;