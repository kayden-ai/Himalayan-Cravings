const getMenu = async () => {
  const response = await fetch('http://localhost:3000/menu');
  const data = await response.json();

  const grid = document.querySelector('.menu-grid');
  grid.innerHTML = '';

  for (const item of data) {
    const card = document.createElement('div');
    card.className = 'menu-card';

    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <span class="price">€${item.price}</span>
      <button class="add-btn" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">Add to Cart</button>
    `;

    grid.appendChild(card);
  }
};

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-btn')) {
    const id = e.target.getAttribute('data-id');
    const name = e.target.getAttribute('data-name');
    const price = e.target.getAttribute('data-price');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.push({id, name, price, quantity: 1});
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(name + ' added to cart');
  }
});

getMenu();
