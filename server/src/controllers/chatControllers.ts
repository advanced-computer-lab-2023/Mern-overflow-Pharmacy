import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express';

import Chat from '../models/chatModel.js';
import User from '../models/User.js';

//@description     Create or fetch One to One Chat
//@route           POST /api/chat/
//@access          Protected
const accessChat = asyncHandler(async (req:any, res:any): Promise<any> => {
  const { docId,patId } = req.body;
  if (!docId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }
  console.log("HERE1");
  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: patId} } },
      { users: { $elemMatch: { $eq: docId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  console.log("HERE2");
  let usersInChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });
  console.log("HERE3");
  if (usersInChat.length > 0) {
    res.send(usersInChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [patId, docId],
      latestMessage:null
    };
    console.log("HERE4 "+" "+patId+" "+docId);
    try {
      console.log("Here5 "+JSON.stringify(chatData));
      const createdChat = await Chat.create(chatData);
      console.log("Here6");
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      console.log("Here7 "+FullChat);
      res.status(200).json(FullChat);
    } catch (error) {
      console.log(error);
      res.status(400);
    }
  }
});

//@description     Fetch all chats for a user
//@route           GET /api/chat/
//@access          Protected
const fetchChats = asyncHandler(async (req:any, res:any):Promise<any> => {
  try {
    console.log("FETECHINGGGGGGGGGGGGGGGGGGG");
    const {userId} = req.params;
    Chat.find({ users: { $elemMatch: { $eq: userId } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results:any) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
  }
});

//@description     Create New Group Chat
//@route           POST /api/chat/group
//@access          Protected
const createGroupChat = asyncHandler(async (req:any, res:any):Promise<any> => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400).send(error);;

  }
});

// @desc    Rename Group
// @route   PUT /api/chat/rename
// @access  Protected
const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
});

// @desc    Remove user from Group
// @route   PUT /api/chat/groupremove
// @access  Protected
const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
});

// @desc    Add user to Group / Leave
// @route   PUT /api/chat/groupadd
// @access  Protected
const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
});

export default {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
}

