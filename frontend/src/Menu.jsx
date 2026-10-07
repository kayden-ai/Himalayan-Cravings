import {useState, useEffect} from 'react';
import {useLanguage} from './App';
import heroImage from './Himalayan Cravings_ A Taste of Nepal.png';

function Menu({cart, setCart, user}) {
  const [menuItems, setMenuItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [announcementInput, setAnnouncementInput] = useState('');
  const {t} = useLanguage();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(
          'https://himalayan-cravings.onrender.com/menu'
        );
        const data = await response.json();
        if (response.ok) {
          setMenuItems(data);
        } else {
          setMenuItems([]);
        }
      } catch (error) {
        setMenuItems([]);
      }
    };
    fetchMenu();

    if (user && user.role === 'admin') {
      const fetchCurrentAnnounce = async () => {
        try {
          const response = await fetch(
            'https://himalayan-cravings.onrender.com/announcement'
          );
          const data = await response.text();
          setAnnouncementInput(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchCurrentAnnounce();
    }
  }, [user]);

  const addToCart = (item) => {
    const existing = cart.find((cartItem) => cartItem.id === item.id);
    if (existing) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        )
      );
    } else {
      setCart([...cart, {...item, quantity: 1}]);
    }
  };

  const handleAddMenuItem = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'https://himalayan-cravings.onrender.com/menu',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            name: newItemName,
            price: newItemPrice,
            description: newItemDesc || 'Delicious Nepalese dish',
            category: newItemCategory,
            image_filename: newItemImage || 'aloo-gobi.jpg',
          }),
        }
      );
      if (response.ok) {
        setNewItemName('');
        setNewItemPrice('');
        setNewItemDesc('');
        setNewItemImage('');
        const updatedMenu = await fetch(
          'https://himalayan-cravings.onrender.com/menu'
        );
        setMenuItems(await updatedMenu.json());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateAnnouncement = async () => {
    try {
      const response = await fetch(
        'https://himalayan-cravings.onrender.com/announcement',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({text: announcementInput}),
        }
      );
      if (response.ok) {
        alert(t.adminUpdate + ' success!');
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="hero-container">
        <img src={heroImage} alt="Himalayan Cravings" />
      </div>

      {user && user.role === 'admin' && (
        <div className="card admin-controls">
          <h3>{t.adminAnnounce}</h3>
          <div className="input-group">
            <input
              value={announcementInput}
              onChange={(e) => setAnnouncementInput(e.target.value)}
              className="input-field"
              placeholder="Enter new banner text..."
            />
            <button onClick={handleUpdateAnnouncement} className="btn-primary">
              {t.adminUpdate}
            </button>
          </div>
        </div>
      )}

      {user && user.role === 'admin' && (
        <div className="card admin-controls">
          <h3>Admin: Add New Menu Item</h3>
          <form
            onSubmit={handleAddMenuItem}
            className="input-group"
            style={{display: 'flex', flexDirection: 'column', gap: '10px'}}
          >
            <input
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Item Name (e.g. Momo)"
              className="input-field"
              required
            />
            <input
              type="number"
              step="0.01"
              value={newItemPrice}
              onChange={(e) => setNewItemPrice(e.target.value)}
              placeholder="Price €"
              className="input-field"
              required
            />
            <input
              value={newItemDesc}
              onChange={(e) => setNewItemDesc(e.target.value)}
              placeholder="Description"
              className="input-field"
            />
            <select
              value={newItemCategory}
              onChange={(e) => setNewItemCategory(e.target.value)}
              className="input-field"
            >
              <option value="Main">Main</option>
              <option value="Starter">Starter</option>
              <option value="Side">Side</option>
              <option value="Dessert">Dessert</option>
              <option value="Drink">Drink</option>
            </select>
            <input
              value={newItemImage}
              onChange={(e) => setNewItemImage(e.target.value)}
              placeholder="Image Filename (e.g. momo.jpg)"
              className="input-field"
            />
            <button type="submit" className="btn-add">
              Add Item
            </button>
          </form>
        </div>
      )}

      <h2 className="page-header">{t.himalayan_menu_title}</h2>

      <div className="menu-grid">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-card">
            <img
              src={`/images/${item.image_filename}`}
              alt={item.name}
              className="menu-image"
            />
            <div className="menu-info">
              <div>
                <h3 className="item-name">{item.name}</h3>
                <p className="item-price">{Number(item.price).toFixed(2)} €</p>
              </div>
              <button onClick={() => addToCart(item)} className="btn-cart-icon">
                🛒
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
