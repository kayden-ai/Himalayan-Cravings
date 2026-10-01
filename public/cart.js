let cart = JSON.parse(localStorage.getItem('himalayanCart')) || [];

const addToCart = (itemName, price) => {
  cart.push({name: itemName, price: price});
  localStorage.setItem('himalayanCart', JSON.stringify(cart));
  console.log(
    `\({itemName} added! You have\){cart.length} items in your cart.`
  );
  updateCartUI();
};

const updateCartUI = () => {
  let total = 0;
  cart.forEach((item) => {
    total += item.price;
  });
  console.log(`Current Total: €${total.toFixed(2)}`);
};

updateCartUI();
