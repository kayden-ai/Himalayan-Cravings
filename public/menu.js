const fetchMenu = async () => {
  const response = await fetch('http://localhost:3000/menu');
  const menuItems = await response.json();

  const grid = document.querySelector('.menu-grid');
  grid.innerHTML = '';

  for (const item of menuItems) {
    const card = document.createElement('div');
    card.className = 'menu-card';

    card.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <span class="price">€${item.price}</span>
            <button class="add-btn">Add to Cart</button>
        `;

    grid.appendChild(card);
  }
};

fetchMenu();
