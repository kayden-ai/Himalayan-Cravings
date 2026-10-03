const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const usernameInput = document.getElementById('username').value;
  const passwordInput = document.getElementById('password').value;

  const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: usernameInput,
      password: passwordInput,
    }),
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem('token', data.token);
    alert('Login successful!');
    window.location.href = 'menu.html';
  } else {
    alert('Login failed. Please try again.');
  }
});
