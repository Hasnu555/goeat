const socketIo = require("socket.io");

let io; 

module.exports = {
  init: (server) => {
    if (!io) { 
      io = socketIo(server, {
        cors: {
          origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
          methods: ["GET", "POST", "PUT", "DELETE"],
          credentials: true,
        },
      });

      io.on("connection", (socket) => {
        console.log(`🔥 New client connected: ${socket.id}`);

        socket.on("disconnect", () => {
          console.log(`❌ Client disconnected: ${socket.id}`);
        });
      });
    }
    return io;
  },

  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized! Make sure server.js initializes it first.");
    }
    return io;
  },
};
