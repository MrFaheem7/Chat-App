const User = require("../models/Users");
const Room = require("../models/Rooms");
const Message = require("../models/Messages");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("A New User Connected");
    //Broadcast to all users
    socket.on("sendMessage", async (data) => {
      const { userId, content } = data;
      const message = new Message({
        sender: userId,
        content,
      });
      await message.save();
      io.emit("messageReceived", message);
    });
    //Private Message
    socket.on("sendPrivateMessage", async (data) => {
      const { senderId, receiverId, content } = data;
      const message = new Message({
        sender: senderId,
        receiver: receiverId,
        content,
      });
      await message.save();
      io.to(receiverId).emit("privateMessageReceived", message);
    });
    //handle create Room
    socket.on("createRoom", async (data) => {
      const { roomName, userId } = data;
      const room = new Room({
        name: roomName,
        participants: [userId],
      });
      await room.save();
      socket.join(room._id);
      io.emit("roomCreated", room);
    });
    //handle Join Room
    socket.on("joinRoom", async (data) => {
      const { roomId, userId } = data;
      const room = await Room.findById(roomId);
      if (room) {
        room.patricipants.push(userId);
        await room.save();
        socket.join(roomId);
        io.to(roomId).emit("joinedRoom", userId);
      }
    });
    //handle sending Messages to room
    socket.on("roomMessage", async (data) => {
      const { roomId, userId, content } = data;
      const message = new Message({
        sender: userId,
        room: roomId,
        content,
      });
      await message.save();
      io.to(roomId).emit("roomMessageReceived", message);
    });
    //disconnect
    socket.on("disconnect", () => {
      console.log("A User Disconnected");
    });
  });
};
