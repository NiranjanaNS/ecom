import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../Axios";
import UserLayout from "../Layout/UserLayout";

const API_URL = "http://13.51.121.100/api"; // your backend

const Cart = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // fetch cart items
  const fetchCart = async () => {
    try {
      const { data } = await Axios.get(`${API_URL}/cart`, { withCredentials: true });
      const cartItems = Array.isArray(data.items) ? data.items : [];
      setItems(cartItems);
      setTotal(cartItems.reduce((sum, i) => sum + (i.price || 0) * (i.quantity || 0), 0));
    } catch (err) {
      setItems([]);
      setMsg(err.response?.data?.message || "Error loading cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (prodId, qty) => {
    try {
      if (qty <= 0) {
        await Axios.delete(`${API_URL}/cart/delete/${prodId}`, { withCredentials: true });
      } else {
        await Axios.put(`${API_URL}/cart/${prodId}`, { quantity: qty }, { withCredentials: true });
      }
      fetchCart();
    } catch (err) {
      setMsg("Failed to update quantity");
    }
  };

  const placeOrder = async () => {
    try {
      const { data } = await Axios.post(`${API_URL}/orders`, {}, { withCredentials: true });
      setMsg(data.message || "Order placed successfully!");
      setItems([]);
      setTotal(0);
      navigate("/orders");
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to place order");
    }
  };

  if (loading) return <p className="p-6 text-center">Loading cart...</p>;

  return (
    <UserLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        {items.length === 0 && <p className="text-gray-500">Cart is empty</p>}

        {items.map((item) => (
          <div key={item.prodId} className="flex justify-between items-center bg-white p-4 mb-4 rounded shadow">
            <div className="flex items-center gap-4">
              <img
                src={item.image?.startsWith("http") ? item.image : `${API_URL}/uploads/${item.image}`}
                alt={item.productName}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h2 className="font-semibold">{item.productName}</h2>
                <p className="text-gray-600">Price: ₹{item.price}</p>
                <p className="text-gray-500 text-sm">
                  Subtotal: ₹{(item.price || 0) * (item.quantity || 0)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.prodId, (item.quantity || 0) - 1)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                -
              </button>
              <span>{item.quantity || 0}</span>
              <button
                onClick={() => updateQuantity(item.prodId, (item.quantity || 0) + 1)}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                +
              </button>
            </div>
          </div>
        ))}

        {items.length > 0 && (
          <div className="flex justify-between items-center bg-white p-4 rounded shadow">
            <p className="text-xl font-bold">Total: ₹{total}</p>
            <button
              onClick={placeOrder}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Place Order
            </button>
          </div>
        )}

        {msg && <p className="mt-4 text-center text-red-500">{msg}</p>}
      </div>
    </UserLayout>
  );
};

export default Cart;
