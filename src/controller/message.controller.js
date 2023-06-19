const Io = require("../utils/io");
const path = require("path");
const Messages = new Io("./dabase/message.json")
const Message = require("../models/Message")


const create = async (req, res) => {
  const { name, phoneNumber, email, message } = req.body;
  
  const newMessage = new Message(name, phoneNumber, email, message);

  const messages = await Messages.read();

  const data = messages.length ? [...messages, newMessage] : [newMessage];

  await Messages.write(data);
};
module.exports = { create };
