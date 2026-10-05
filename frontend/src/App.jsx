import { useState } from 'react';
import Menu from './Menu';
import Cart from './Cart';
import Transit from './Transit';
import Login from './Login';

function App() {
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState('menu');

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#007bff' }}>Himalayan Cravings</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setActiveTab('menu')} style={{ marginRight: '10px', padding: '5px 10px' }}>Menu</button>
        <button onClick={() => setActiveTab('cart')} style={{ marginRight: '10px', padding: '5px 10px' }}>Cart ({cart.length})</button>
        <button onClick={() => setActiveTab('transit')} style={{ marginRight: '10px', padding: '5px 10px' }}>Transit</button>
        <button onClick={() => setActiveTab('login')} style={{ padding: '5px 10px' }}>Login</button>
      </div>

      {activeTab === 'menu' && <Menu cart={cart} setCart={setCart} />}
      {activeTab === 'cart' && <Cart cart={cart} setCart={setCart} />}
      {activeTab === 'transit' && <Transit />}
      {activeTab === 'login' && <Login />}
    </div>
  );
}

export default App;
