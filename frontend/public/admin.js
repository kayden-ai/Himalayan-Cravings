const addDishForm = document.getElementById('add-dish-form');

addDishForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const nameInput = document.getElementById('dish-name').value;
  const descInput = document.getElementById('dish-desc').value;
  const priceInput = document.getElementById('dish-price').value;

  const token = localStorage.getItem('token');

  if (!token) {
    alert('You must be logged in to add a dish.');
    window.location.href = 'login.html';
    return;
  }

  const response = await fetch('http://localhost:3000/menu', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({
      name: nameInput,
      description: descInput,
      price: priceInput,
      category: 'General',
      dietary_tags: '',
    }),
  });

  if (response.ok) {
    alert('Dish added successfully!');
    window.location.href = 'menu.html';
  } else {
    alert('Failed to add dish. Make sure you are an admin.');
  }
});
