import {useState} from 'react';

function Cart({cart, setCart}) {
  const [orderMessage, setOrderMessage] = useState('');

  const clearCart = () => {
    setCart([]);
  };

  const handleCheckout = async () => {
    const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

    try {
      const response = await fetch(
        'https://himalayan-cravings.onrender.com/orders',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({items: cart, total_price: total}),
        }
      );

      if (response.ok) {
        setCart([]);
        setOrderMessage('Order sent to kitchen! Ready for pickup soon.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card">
      <h2 className="page-header">Your Cart</h2>
      {orderMessage && (
        <p style={{color: '#28a745', fontWeight: 'bold', marginBottom: '15px'}}>
          {orderMessage}
        </p>
      )}
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <span>{item.name}</span>
              <span>€{Number(item.price).toFixed(2)}</span>
            </div>
          ))}
          <h3 className="cart-total">
            Total: €
            {cart.reduce((sum, item) => sum + Number(item.price), 0).toFixed(2)}
          </h3>
          <div className="cart-actions">
            <button onClick={clearCart} className="btn-danger">
              Clear Cart
            </button>
            <button onClick={handleCheckout} className="btn-primary">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
