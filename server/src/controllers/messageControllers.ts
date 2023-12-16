import asyncHandler from "express-async-handler";
import Message from "../models/messageModel.js";
import User from "../models/User.js";
import Chat from "../models/chatModel.js";

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req:any, res:any) => {
  console.log("HI");
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req:any, res:any) => {
  const { content, chatId , userId} = req.body;
  console.log("Hello "+userId);
  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: userId,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");

    const msg = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: msg });

    res.json(msg);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
});


export default{
  allMessages,
  sendMessage
}

