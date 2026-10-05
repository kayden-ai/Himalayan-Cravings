import React, {useState, useEffect} from 'react';
import {
  ShoppingCart,
  Menu as MenuIcon,
  MapPin,
  User,
  Home,
  Utensils,
  Trash2,
  CreditCard,
} from 'lucide-react';

const MOCK_MENU_DATA = [
  {
    id: 1,
    name: 'Mo:Mo',
    description: 'Steamed dumplings filled with meat or vegetables.',
    price: 10.0,
  },
  {
    id: 2,
    name: 'Chicken Curry',
    description: 'Traditional Nepali chicken curry served with rice.',
    price: 15.0,
  },
  {
    id: 3,
    name: 'Dal Bhat',
    description: 'Traditional lentil soup with rice and vegetable curry.',
    price: 12.0,
  },
  {
    id: 4,
    name: 'Chow Mein',
    description: 'Wok-tossed noodles with fresh vegetables and chicken.',
    price: 10.0,
  },
  {
    id: 5,
    name: 'Thukpa',
    description: 'Hearty Himalayan noodle soup with vegetables and herbs.',
    price: 9.0,
  },
  {
    id: 6,
    name: 'Paneer Tikka',
    description: 'Grilled marinated cottage cheese cubes with mint chutney.',
    price: 11.5,
  },
];

const fetchMenuData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_MENU_DATA);
    }, 600);
  });
};

const Navbar = ({currentPage, setCurrentPage, cartItemCount}) => {
  const navItems = [
    {id: 'home', label: 'Home', icon: <Home size={18} />},
    {id: 'menu', label: 'Menu', icon: <Utensils size={18} />},
    {
      id: 'cart',
      label: `Cart (${cartItemCount})`,
      icon: <ShoppingCart size={18} />,
    },
    {id: 'transit', label: 'Transit', icon: <MapPin size={18} />},
    {id: 'login', label: 'Login', icon: <User size={18} />},
  ];

  return (
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            <span className="font-bold text-2xl tracking-tight text-blue-400">
              Himalayan Cravings
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex items-center space-x-1 hover:text-blue-400 transition-colors ${
                  currentPage === item.id
                    ? 'text-blue-400 font-semibold'
                    : 'text-gray-300'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

const HomePage = ({setCurrentPage}) => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
    <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
      Experience the Himalayas
    </h1>
    <p className="text-xl text-gray-600 mb-8 max-w-2xl">
      Authentic Nepali and Himalayan cuisine brought straight to your table.
      Discover flavors that elevate your senses.
    </p>
    <button
      onClick={() => setCurrentPage('menu')}
      className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105"
    >
      Order Now
    </button>
  </div>
);

const MenuPage = ({addToCart}) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenuData().then((data) => {
      setMenuItems(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">
        Our Menu
      </h2>
      {loading ? (
        <div className="text-center text-gray-500 text-xl">
          Loading delicious food...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 flex flex-col"
            >
              <div className="p-6 flex-grow">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <span className="text-xl font-bold text-green-600">
                  €{item.price.toFixed(2)}
                </span>
              </div>
              <div className="p-4 bg-gray-50 border-t border-gray-100">
                <button
                  onClick={() => addToCart(item)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CartPage = ({cart, clearCart, checkout}) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">
        Your Cart
      </h2>

      {cart.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-xl text-gray-500">
            Your cart is completely empty.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="p-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center py-4 border-b border-gray-100 last:border-0"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-500">Qty: {item.quantity}</p>
                </div>
                <div className="text-lg font-bold text-gray-800">
                  €{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <span className="text-2xl font-bold text-gray-800">Total:</span>
              <span className="text-3xl font-extrabold text-green-600">
                €{total.toFixed(2)}
              </span>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={clearCart}
                className="flex-1 flex justify-center items-center space-x-2 bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-3 px-4 rounded transition-colors"
              >
                <Trash2 size={20} />
                <span>Clear Cart</span>
              </button>
              <button
                onClick={checkout}
                className="flex-2 w-2/3 flex justify-center items-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition-colors"
              >
                <CreditCard size={20} />
                <span>Checkout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TransitPage = () => {
  const [startLocation, setStartLocation] = useState('');
  const [routeResult, setRouteResult] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');
  const [error, setError] = useState(false);

  const fetchTransitRoute = async () => {
    if (!startLocation.trim()) {
      setStatusMessage('Please enter a starting station or location.');
      setError(true);
      return;
    }

    setStatusMessage('Fetching real HSL route...');
    setError(false);
    setRouteResult([]);

    try {
      const query = `{
        plan(
          from: {lat: 60.1704, lon: 24.9415}
          to: {lat: 60.2239, lon: 24.7581}
          numItineraries: 1
        ) {
          itineraries {
            legs {
              mode
              startTime
              endTime
              from { name }
              to { name }
              route { shortName }
            }
          }
        }
      }`;

      const response = await fetch(
        'https://api.digitransit.fi/routing/v2/routers/hsl/index/graphql',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/graphql',
            'digitransit-subscription-key': '9c401874a8c245d788c3cf53af315880',
          },
          body: query,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error (${response.status}): ${errorText}`);
      }

      const data = await response.json();

      if (
        !data.data ||
        !data.data.plan ||
        data.data.plan.itineraries.length === 0
      ) {
        setStatusMessage('No routes found.');
        setError(true);
        return;
      }

      const legs = data.data.plan.itineraries[0].legs;

      const formattedRoutes = legs.map((leg) => {
        const vehicle = leg.route ? leg.route.shortName : leg.mode;
        return `Take ${vehicle} from ${leg.from.name || 'Origin'} to ${leg.to.name || 'Destination'}`;
      });

      setRouteResult(formattedRoutes);
      setStatusMessage('');
    } catch (err) {
      setError(true);
      if (err.message.includes('401')) {
        setStatusMessage(
          'Access Denied: The HSL subscription key is invalid or expired.'
        );
      } else {
        setStatusMessage('Error fetching route. Check connection or API key.');
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">
        Find Your Way Here
      </h2>

      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Starting station or location
          </label>
          <input
            type="text"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
            placeholder="e.g., Leppävaara"
            className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          onClick={fetchTransitRoute}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition-colors mb-6"
        >
          Get Transit Route
        </button>

        {statusMessage && (
          <div
            className={`p-4 rounded ${error ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-blue-50 text-blue-700 border border-blue-200'}`}
          >
            {statusMessage}
          </div>
        )}

        {routeResult.length > 0 && (
          <div className="mt-6 space-y-3">
            <h3 className="font-bold text-gray-800 text-lg border-b pb-2">
              Recommended Route:
            </h3>
            {routeResult.map((step, index) => (
              <p key={index} className="text-gray-700 flex items-start">
                <span className="mr-2 text-green-600 font-bold">
                  {index + 1}.
                </span>
                {step}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const LoginPage = () => (
  <div className="max-w-md mx-auto px-4 py-12">
    <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">
      Staff Login
    </h2>
    <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Username
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">
          Password
        </label>
        <input
          type="password"
          className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors">
        Secure Login
      </button>
    </div>
  </div>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        );
      }
      return [...prevCart, {...item, quantity: 1}];
    });
  };

  const clearCart = () => setCart([]);

  const checkout = () => {
    alert(
      'Connecting to order backend soon! Your order total is €' +
        cart
          .reduce((sum, item) => sum + item.price * item.quantity, 0)
          .toFixed(2)
    );
    clearCart();
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'menu':
        return <MenuPage addToCart={addToCart} />;
      case 'cart':
        return (
          <CartPage cart={cart} clearCart={clearCart} checkout={checkout} />
        );
      case 'transit':
        return <TransitPage />;
      case 'login':
        return <LoginPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartItemCount={cartItemCount}
      />
      <main className="pb-20">{renderPage()}</main>
    </div>
  );
}
