import http from "http";
import WebSocket from "ws";
import express from "express";
// import SocketIO from "socket.io";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));

// const wsServer = SocketIO(httpServer);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const sockets = [];
wss.on("connection", (socket) => {
  sockets.push(socket);
  socket.on("close", () => {
    console.log("closed");
  });
  socket.on("message", (message) => {
    //?utf-8로 인코딩 후 JSON으로 파싱
    const parsed = JSON.parse(message.toString("utf-8"));
    switch (parsed.type) {
      case "new-message":
        sockets.forEach((aSocket) => {
          aSocket.send(`${socket.nickname}: ${parsed.payload}`);
        });
      case "nickname":
        socket["nickname"] = parsed.payload;
    }
  });
});

const handleListen = () => console.log(`Listening on http://localhost:3000`);
server.listen(3000, handleListen);
