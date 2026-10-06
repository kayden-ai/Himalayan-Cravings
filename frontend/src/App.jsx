import {useState, useEffect, createContext, useContext} from 'react';
import Menu from './Menu';
import Cart from './Cart';
import Transit from './Transit';
import Orders from './Orders';
import Login from './Login';
import Signup from './Signup';
import './index.css';
import {translations} from './translations';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

function App() {
  const [activeTab, setActiveTab] = useState('menu');
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [announcement, setAnnouncement] = useState('');
  const [language, setLanguage] = useState('en');

  const t = translations[language];

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await fetch(
          'https://himalayan-cravings.onrender.com/announcement'
        );
        const data = await response.text();
        setAnnouncement(data);
      } catch (error) {
        setAnnouncement(t.announcementFallback);
      }
    };
    fetchAnnouncement();
  }, [language, t.announcementFallback]);

  const logout = () => {
    setUser(null);
    setActiveTab('menu');
  };

  return (
    <LanguageContext.Provider value={{language, setLanguage, t}}>
      <div className="App">
        <div className="announcement-banner">
          <p>{announcement || t.announcementFallback}</p>
        </div>

        <header className="navbar">
          <h1 className="logo">Himalayan Cravings</h1>
          <nav className="nav-links">
            <button onClick={() => setActiveTab('menu')}>{t.menu}</button>
            <button onClick={() => setActiveTab('cart')}>
              {t.cart} ({cart.length})
            </button>
            <button onClick={() => setActiveTab('transit')}>{t.transit}</button>

            {user && (
              <>
                {user.role === 'admin' && (
                  <button onClick={() => setActiveTab('orders')}>
                    {t.orders}
                  </button>
                )}
                <span className="user-welcome">({user.username})</span>
                <button onClick={logout} className="btn-logout">
                  Logout
                </button>
              </>
            )}

            {!user && (
              <button onClick={() => setActiveTab('login')}>{t.login}</button>
            )}

            <button
              onClick={() => setLanguage(language === 'en' ? 'fi' : 'en')}
              className="language-toggle"
            >
              {language.toUpperCase()}
            </button>
          </nav>
        </header>

        <div className="container">
          {activeTab === 'menu' && (
            <Menu cart={cart} setCart={setCart} user={user} />
          )}
          {activeTab === 'cart' && <Cart cart={cart} setCart={setCart} />}
          {activeTab === 'transit' && <Transit />}
          {activeTab === 'orders' && <Orders />}
          {activeTab === 'login' && (
            <Login setUser={setUser} setActiveTab={setActiveTab} />
          )}
          {activeTab === 'signup' && <Signup setActiveTab={setActiveTab} />}
        </div>
      </div>
    </LanguageContext.Provider>
  );
}

export default App;
