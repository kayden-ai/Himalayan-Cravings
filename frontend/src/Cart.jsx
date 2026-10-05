function Cart({ cart, setCart }) {
  const clearCart = () => {
    setCart([]);
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>Your cart is empty.</p> : (
        <div>
          {cart.map((item, index) => (
            <p key={index} style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>{item.name} - €{item.price.toFixed(2)}</p>
          ))}
          <h3>Total: €{cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</h3>
          <button onClick={clearCart} style={{ background: '#dc3545', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '3px', cursor: 'pointer', marginRight: '10px' }}>Clear Cart</button>
          <button style={{ background: '#007bff', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Checkout</button>
        </div>
      )}
    </div>
  );
}

export default Cart;
