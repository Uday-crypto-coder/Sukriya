const currentUser = getCurrentUser();
const viewingUser = localStorage.getItem('viewingProfile') || currentUser;

document.getElementById('profile-name').textContent = viewingUser;
const avatarUrl = localStorage.getItem(`${viewingUser}_avatar`) || 'https://i.pravatar.cc/100?u=' + viewingUser;
document.getElementById('avatar').src = avatarUrl;

const bio = localStorage.getItem(`${viewingUser}_bio`) || 'This user has no bio.';
document.getElementById('bio-text').textContent = bio;

if (viewingUser === currentUser) {
  document.getElementById('edit-section').style.display = 'block';
  document.getElementById('edit-bio').value = bio;
  document.getElementById('edit-avatar').value = avatarUrl;
} else {
  const followDiv = document.getElementById('follow-controls');
  const following = isFollowing(viewingUser);
  followDiv.innerHTML = `
    <button onclick="${following ? 'unfollowUser' : 'followUser'}('${viewingUser}'); location.reload();">
      ${following ? 'Unfollow' : 'Follow'}
    </button>
  `;
}

function countFollowers(user) {
  const allUsers = getMockUsers();
  return allUsers.filter(u => {
    const f = JSON.parse(localStorage.getItem(`${u}_following`) || "[]");
    return f.includes(user);
  }).length;
}

function countFollowing(user) {
  return JSON.parse(localStorage.getItem(`${user}_following`) || "[]").length;
}

document.getElementById('followers-count').textContent = countFollowers(viewingUser);
document.getElementById('following-count').textContent = countFollowing(viewingUser);

function saveProfile() {
  const newBio = document.getElementById('edit-bio').value.trim();
  const newAvatar = document.getElementById('edit-avatar').value.trim();
  if (newBio) localStorage.setItem(`${currentUser}_bio`, newBio);
  if (newAvatar) localStorage.setItem(`${currentUser}_avatar`, newAvatar);
  location.reload();
}
