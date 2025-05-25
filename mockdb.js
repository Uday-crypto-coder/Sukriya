function getCurrentUser() {
  return localStorage.getItem('currentUser');
}

function setCurrentUser(username) {
  localStorage.setItem('currentUser', username);
  if (!getMockUsers().includes(username)) {
    const users = getMockUsers();
    users.push(username);
    localStorage.setItem('mockUsers', JSON.stringify(users));
  }
}

function getMockUsers() {
  return JSON.parse(localStorage.getItem('mockUsers')) || ["alice", "bob", "charlie"];
}

function followUser(username) {
  const me = getCurrentUser();
  let following = JSON.parse(localStorage.getItem(`${me}_following`) || "[]");
  if (!following.includes(username)) {
    following.push(username);
    localStorage.setItem(`${me}_following`, JSON.stringify(following));
  }
}

function unfollowUser(username) {
  const me = getCurrentUser();
  let following = JSON.parse(localStorage.getItem(`${me}_following`) || "[]");
  following = following.filter(u => u !== username);
  localStorage.setItem(`${me}_following`, JSON.stringify(following));
}

function isFollowing(username) {
  const me = getCurrentUser();
  const following = JSON.parse(localStorage.getItem(`${me}_following`) || "[]");
  return following.includes(username);
}

function sendMessage(to, text) {
  const me = getCurrentUser();
  const key = `chat_${[me, to].sort().join("_")}`;
  const messages = JSON.parse(localStorage.getItem(key) || "[]");
  messages.push({ from: me, text, timestamp: Date.now() });
  localStorage.setItem(key, JSON.stringify(messages));
}

function getMessagesWith(user) {
  const me = getCurrentUser();
  const key = `chat_${[me, user].sort().join("_")}`;
  return JSON.parse(localStorage.getItem(key) || "[]");
}
function getPosts() {
  return JSON.parse(localStorage.getItem("posts") || "[]");
}

function savePosts(posts) {
  localStorage.setItem("posts", JSON.stringify(posts));
}
