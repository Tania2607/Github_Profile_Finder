const searchBtn = document.getElementById('searchBtn');
const profileDiv = document.getElementById('profile');

searchBtn.addEventListener('click', async () => {
  const username = document.getElementById('username').value.trim();
  if (!username) return;

  profileDiv.innerHTML = 'Loading...';

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    
    if (!response.ok) {
      throw new Error('User not found');
    }

    const data = await response.json();
    profileDiv.innerHTML = `
      <div class="profile-card">
        <img src="${data.avatar_url}" alt="${data.login}" />
        <div class="profile-info">
          <h2>${data.name || data.login}</h2>
          <p>${data.bio || 'No bio available'}</p>
          <div class="stats">
            <p><strong>Followers:</strong> ${data.followers}</p>
            <p><strong>Following:</strong> ${data.following}</p>
            <p><strong>Public Repos:</strong> ${data.public_repos}</p>
            <p><a href="${data.html_url}" target="_blank">View Profile</a></p>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    profileDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
});
