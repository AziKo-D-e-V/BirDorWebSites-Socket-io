require("dotenv/config");
const express = require("express");
const router = require("./routes");
const cookie = require("cookie-parser");
const fileUpload = require("express-fileupload");
const http = require("http");
const socketIO = require("socket.io");
const Message = require("./models/Message");
const Io = require("./utils/io")
const Messages = new Io("./database/messages.json")

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 4377;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());
app.use(fileUpload());

app.use(express.static(process.cwd() + "/src/public"));
app.use(express.static(process.cwd() + "/uploads"));

app.set("view engine", "ejs");
app.set("views", "src/views");

app.use(router);

io.on("connection", (socket) => {
socket.on("submit", async (data) => {
  io.emit("backend-contact", { message: data });
  console.log(data);
  const create = async (data) => {
    // Code to save data to JSON file
    const { name, phone, email, message } = data;
    
    const newMessage = new Message(name, phone, email, message);
    
    const messages = await Messages.read();
    
    const datas = messages.length ? [...messages, newMessage] : [newMessage];
    
    await Messages.write(datas);
  };


  await create(data);
});
});


server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
