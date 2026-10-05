function Menu({cart, setCart}) {
  const menuItems = [
    {id: 1, name: 'Mo:Mo', price: 10.0},
    {id: 2, name: 'Chicken Curry', price: 15.0},
    {id: 3, name: 'Dal Bhat', price: 12.0},
    {id: 4, name: 'Chow Mein', price: 10.0},
  ];

  const addToCart = (item) => {
    setCart([...cart, item]);
    alert(item.name + ' added to cart');
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
      }}
    >
      {menuItems.map((item) => (
        <div
          key={item.id}
          style={{
            border: '1px solid #ccc',
            padding: '15px',
            borderRadius: '5px',
          }}
        >
          <h3>{item.name}</h3>
          <p>€{item.price.toFixed(2)}</p>
          <button
            onClick={() => addToCart(item)}
            style={{
              background: '#28a745',
              color: 'white',
              padding: '8px 12px',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
            }}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Menu;
