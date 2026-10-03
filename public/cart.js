console.log('HELLO! The cart script is successfully connected!');

let cart = JSON.parse(localStorage.getItem('himalayanCart')) || [];

function addToCart(itemName, itemPrice) {
  cart.push({name: itemName, price: itemPrice});
  localStorage.setItem('himalayanCart', JSON.stringify(cart));
  alert(`${itemName} was added to your cart!`);
  console.log('Current Cart:', cart);
}

const momoButton = document.getElementById('add-momo');
if (momoButton) {
  momoButton.addEventListener('click', () => {
    addToCart('Mo:Mo', 10.0);
  });
}

const curryButton = document.getElementById('add-curry');
if (curryButton) {
  curryButton.addEventListener('click', () => {
    addToCart('Chicken Curry', 15.0);
  });
}
