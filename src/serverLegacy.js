// import WebSocket from "ws";

// const wss = new WebSocket.Server({ server });

// const sockets = [];
// wss.on("connection", (socket) => {
//   sockets.push(socket);

// socket.on("close", () => {
//   console.log("00님이 퇴장햇습니다");
// });
//   socket.on("message", (message) => {
//     //?utf-8로 인코딩 후 JSON으로 파싱
//     const parsed = JSON.parse(message.toString("utf-8"));
//     switch (parsed.type) {
//       case "new-message":
//         sockets.forEach((aSocket) => {
//           aSocket.send(`${socket.nickname}: ${parsed.payload}`);
//         });
//       case "nickname":
//         socket["nickname"] = parsed.payload;
//     }
//   });
// });
