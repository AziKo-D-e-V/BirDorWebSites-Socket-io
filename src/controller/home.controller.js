const Io = require("../utils/io");
const Messages = new Io("./database/messages.json")

const home = async (req, res) => {

  res.render("index");
};

const adminPage = async (req, res) => {
  res.render("admin");
};

const page404 = async(req, res) =>{
  res.render("404");
}

const ShowMessage = async (req, res) => {
  const messagess  = await Messages.read()

  res.render("Contact-show", {messagess});
}

module.exports = {
  home,
  adminPage,
  page404,
  ShowMessage,
};
