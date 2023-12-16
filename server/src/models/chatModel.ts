
import { Document, Schema, Model, model, Types } from 'mongoose';


interface IChat extends Document {
  chatName: string;
  isGroupChat: boolean;
  users: Types.ObjectId[];
  latestMessage?: Types.ObjectId;
  groupAdmin?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const chatSchema = new Schema<IChat>(
  {
    chatName: { type: String, trim: true,required:true },
    isGroupChat: { type: Boolean, default: false ,required:true },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' ,required:true }],
    latestMessage: { type: Schema.Types.ObjectId, ref: 'Message' ,required:false },
    groupAdmin: { type: Schema.Types.ObjectId, ref: 'User', required:false },
  },
  { timestamps: true }
);



const ChatModel: Model<IChat> = model('Chat', chatSchema);

export default ChatModel;

