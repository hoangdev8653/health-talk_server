const { Server } = require("socket.io");

export const connectSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
      credentials: true,
    },
  });
  io.on("connection", (socket) => {
    console.log("Kết nối socket thành công ✅");
    socket.on("disconnect", () => {
      console.log("Ngắt kết nối socket ❌");
    });
  });
};
