const dotenv = require("dotenv");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { connectToDb } = require("./config/database");

dotenv.config();
// Initialize app
const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
// Connect to MongoDB
connectToDb();
// Middleware to parse JSON bodies
app.use(express.json());
//Routes
app.use("/api/auth", require("./routes/authRoutes"));

//Socket.io Connection
require("./sockets/chatSockets")(io);

// Port configuration

const PORT = process.env.PORT;

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
