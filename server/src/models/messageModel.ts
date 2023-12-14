import { Document, Schema, Model, model, Types } from 'mongoose';


export interface IMessage extends Document {
  sender: Types.ObjectId;
  content: string;
  chat: Types.ObjectId;
  readBy?: (Types.ObjectId)[];
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'User',required:true },
    content: { type: String, trim: true,required:true  },
    chat: { type: Schema.Types.ObjectId, ref: 'Chat',required:true  },
    readBy: [{ type: Schema.Types.ObjectId, ref: 'User' ,required:true }],
  },
  { timestamps: true }
);

const MessageModel: Model<IMessage> = model('Message', messageSchema);

export default MessageModel;
