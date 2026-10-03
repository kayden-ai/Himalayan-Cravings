const authLink = document.getElementById('auth-link');
const token = localStorage.getItem('token');

if (token && authLink) {
  authLink.innerText = 'Logout';
  authLink.href = '#';

  authLink.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    window.location.href = 'login.html';
  });
}
