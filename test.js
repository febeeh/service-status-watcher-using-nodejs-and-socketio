const { exit } = require("process");
const io = require("socket.io-client");

// Connect to the Socket.IO server
const socket = io("http://localhost:3030");

socket.on("connect", () => {
  console.log("Connected to server");

  // Emit the "get_service_status" event
  socket.emit("get_service_status", {}, (response) => {
    console.log("Received service status:", response);
    socket.disconnect();
    exit(0);
  });
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});
