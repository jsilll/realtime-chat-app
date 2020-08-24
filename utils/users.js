const users = [];

// Join user to chat
function userJoin(id, username, room) {
  const user = {
    id,
    username,
    room,
    state: {
      typing: 0,
    },
  };
  const repeated = users.filter((user) => user.username == username).length;
  if (repeated) {
    user.username = user.username + ` (${repeated})`;
  }
  users.push(user);
  return user;
}

// Change user typing state
function userTyping(id, state) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users[index].state.typing = state;
    return users[index];
  }
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users getRoomUsers
function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

// Get current user
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

module.exports = {
  userJoin,
  userLeave,
  getCurrentUser,
  getRoomUsers,
  userTyping,
};
