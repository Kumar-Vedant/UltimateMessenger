require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const socketHandler = require("./socket");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Update in production!
    methods: ["GET", "POST"],
  },
});

socketHandler(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
