require("dotenv").config();
const app = require("./app");
const connectdb = require("./db/mongodb");
const { dbConfig } = require("./config");

connectdb(dbConfig);
const server = app.listen(5052, () => {
  console.log(`server on port ${5052}`);
});

const SocketIo = require("socket.io");
const io = SocketIo(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  
  socket.on("create", (create) => {
    console.log("create " ,create);
    socket.join(create.nameServer);
    socket.emit("create", {create: create, id:socket.id });
  });

  socket.on("join", (join) => {
    console.log("join ",join);
    socket.to(join.nameServer).emit("join", {join: join, id:socket.id });
  });

  socket.on("updateData", (updateData) => {
    console.log("updateData ",updateData);
    socket.broadcast.emit("updateData", updateData);
  });

  socket.on("startGame", (startGame) => {
    console.log("startGame", startGame);
    socket.broadcast.emit("startGame", startGame);
  });

  socket.on("correct", (correct) => {
    console.log("correct", correct);
    socket.broadcast.emit("correct", correct);
  });

  socket.on("exitMember", (exitMember) => {
    console.log("exitMember ", exitMember);
    socket.broadcast.to(exitMember.nameServer).emit("exitMember", exitMember)
    socket.leave(exitMember.nameServer);
  });
});
