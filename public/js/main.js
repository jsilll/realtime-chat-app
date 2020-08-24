const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("msg");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const usersCount = document.getElementById("users-count");
const usersList = document.getElementById("users");

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

// Join room
socket.emit("joinRoom", { username, room });

// Get room and users
socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
  outputUserCount(users);
});

// Write a new message
socket.on("message", (message) => {
  outputMessage(message);
  // Scroll Down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatInput.addEventListener("focusout", (e) => {
  socket.emit("typing", 0);
});

chatInput.addEventListener("focus", (e) => {
  socket.emit("typing", 1);
});

// Message submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Get message text
  const msg = e.target.elements.msg.value;
  // Emit a message to the server
  socket.emit("chatMessage", msg);
  // Clear previous input text
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(msg) {
  const div = document.createElement("div");
  const p1 = document.createElement("p");
  div.classList.add("message");
  if (msg.admin) {
    p1.classList.add("admin");
  } else {
    p1.classList.add("meta");
  }
  const span = document.createElement("span");
  const p2 = document.createElement("p");
  p2.classList.add("text");
  p1.innerText = msg.username + " ";
  span.innerText = msg.time;
  p2.innerText = msg.text;
  p1.appendChild(span);
  div.appendChild(p1);
  div.appendChild(p2);
  document.querySelector(".chat-messages").appendChild(div);
}

// Output users to DOM
function outputUsers(users) {
  usersList.innerHTML = "";
  users.sort().forEach((user) => {
    const li = document.createElement("li");
    if (user.state.typing) {
      const b = document.createElement("b");
      li.appendChild(b);
      b.innerText = user.username;
    } else {
      li.innerText = `${user.username}`;
    }
    usersList.appendChild(li);
  });
}

// Output room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

function outputUserCount(users) {
  usersCount.innerHTML = `<i class="fas fa-users"></i> Online (${users.length})`;
}
