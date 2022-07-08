const socket = io();

const welcome = document.getElementById("welcome");
const roomnameForm = welcome.querySelector("#roomname");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function addmessage(msg) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = msg;
  ul.appendChild(li);
}

function handleMessageSubmit(e) {
  e.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;
  socket.emit("new_message", roomName, value, () => {
    addmessage(`You: ${value}`);
  });
  input.value = "";
}

function handleNicknameSubmit(e) {
  e.preventDefault();
  const input = room.querySelector("#name input");
  const value = input.value;
  socket.emit("nickname", value);
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;

  const msgForm = room.querySelector("#msg");
  const nameForm = room.querySelector("#name");
  msgForm.addEventListener("submit", handleMessageSubmit);
  nameForm.addEventListener("submit", handleNicknameSubmit);
}

function handleRoomSubmit(e) {
  e.preventDefault();
  const input = roomnameForm.querySelector("input");
  //string아닌 객체도 전송 가능
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
}

roomnameForm.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (someone, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${newCount})`;
  addmessage(`${someone} joined!`);
});

socket.on("bye", (someone, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${newCount})`;
  addmessage(`${someone} left ㅠㅠ`);
});

socket.on("new_message", addmessage);

socket.on("room_change", (rooms) => {
  const roomList = welcome.querySelector("ul");
  roomList.innerHTML = "";
  if (rooms.length === 0) {
    return;
  }
  rooms.forEach((room) => {
    // console.log(document.querySelector("li")?.innerText);
    const li = document.createElement("li");
    li.innerText = room;
    roomList.append(li);
  });
});
