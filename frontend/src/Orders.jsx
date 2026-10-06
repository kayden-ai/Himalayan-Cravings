import {useState, useEffect} from 'react';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:3000/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await fetch(`http://localhost:3000/orders/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({status: newStatus}),
      });
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card">
      <h2 className="page-header">Pickup Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              border: '1px solid #ddd',
              padding: '15px',
              marginBottom: '15px',
              borderRadius: '5px',
            }}
          >
            <h3>
              Order #{order.id} - €{Number(order.total_price).toFixed(2)}
            </h3>
            <p>
              Status: <strong>{order.status}</strong>
            </p>
            <div style={{marginTop: '10px', display: 'flex', gap: '10px'}}>
              <button
                onClick={() => updateStatus(order.id, 'ready for pickup')}
                className="btn-primary"
              >
                Mark Ready
              </button>
              <button
                onClick={() => updateStatus(order.id, 'completed')}
                className="btn-add"
              >
                Completed
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
