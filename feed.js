const currentUser = getCurrentUser();
if (!currentUser) window.location.href = "login.html";
document.getElementById("username").textContent = currentUser;

function uploadPost() {
  const caption = document.getElementById("caption").value.trim();
  const imageUrl = document.getElementById("image-url").value.trim();

  if (!caption || !imageUrl) {
    alert("Please enter both caption and image URL.");
    return;
  }

  const posts = getPosts();
  posts.push({
    user: currentUser,
    caption,
    imageUrl,
    timestamp: Date.now(),
  });
  savePosts(posts);
  document.getElementById("caption").value = "";
  document.getElementById("image-url").value = "";
  renderFeed();
}

function renderFeed() {
  const container = document.getElementById("feed-container");
  const following = JSON.parse(localStorage.getItem(`${currentUser}_following`) || "[]");
  const posts = getPosts()
    .filter(post => following.includes(post.user) || post.user === currentUser)
    .sort((a, b) => b.timestamp - a.timestamp);

  container.innerHTML = "<h3>Feed</h3>";
  posts.forEach(post => {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
      <div class="post-header">
        <strong>${post.user}</strong>
      </div>
      <img src="${post.imageUrl}" class="post-img" alt="Post image" />
      <p>${post.caption}</p>
      <button class="like-button">❤️ Like</button>
      <hr />
    `;
    container.appendChild(div);
  });
}

renderFeed();
