import mongoose, {Document, Schema, model} from "mongoose";

export interface IUser extends Document {
    username:string;
    passwordHash: string;
    email: string,
    __t: string;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true , unique: true },
    passwordHash:{ type: String, required: true },  
    email: { type: String, required: true, match : [/\S+@\S+\.\S+/, "invalid email"], },
})

userSchema.pre("save", function (next) {
    if (this.isModified("email")) {
      this.email = this.email.toLowerCase();
    }
    next();
  })

const User = model<IUser>('User', userSchema);

export default mongoose.model<IUser>("User", userSchema);