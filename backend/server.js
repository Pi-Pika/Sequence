const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.use(express.static(path.join(__dirname, "../frontend")));

io.on("connection", (socket) => {
    console.log("User connected with socket ID:", socket.id);
    
});
