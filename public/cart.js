console.log('Cart script initialized');

const cartItems = document.getElementById('cart-items');
const cartSummary = document.getElementById('cart-summary');
const cartTotal = document.getElementById('cart-total');
const clearBtn = document.getElementById('clear-btn');
const checkoutBtn = document.getElementById('checkout-btn');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayCart() {
  cartItems.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p>Your cart is empty.</p>';
    cartSummary.style.display = 'none';
  } else {
    cartSummary.style.display = 'block';

    cart.forEach((item) => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('menu-card');

      const itemPrice = parseFloat(item.price);
      total += itemPrice * item.quantity;

      itemElement.innerHTML = `
        <h3>${item.name}</h3>
        <p>Quantity: ${item.quantity}</p>
        <p>Price: €${(itemPrice * item.quantity).toFixed(2)}</p>
      `;

      cartItems.appendChild(itemElement);
    });

    cartTotal.textContent = total.toFixed(2);
  }
}

if (clearBtn) {
  clearBtn.addEventListener('click', () => {
    localStorage.removeItem('cart');
    cart = [];
    displayCart();
  });
}

if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    alert('Connecting to order backend soon!');
  });
}

displayCart();
