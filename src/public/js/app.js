const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");

//!핵심은요거
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
  const msg = { type, payload };
  //!데이터통신을 할 때 무조건 string으로 넘겨야 함
  return JSON.stringify(msg);
}

socket.addEventListener("open", () => {
  console.log("Connected to Server");
});

socket.addEventListener("message", (message) => {
  console.log(message.data);
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("Closed");
});

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  // console.log(input.value);
  socket.send(makeMessage("new-message", input.value));
  input.value = "";
}

function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));

  const main = document.querySelector("#nickname");
  const div = document.createElement("div");
  div.innerText = input.value;
  main.append(div);

  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
