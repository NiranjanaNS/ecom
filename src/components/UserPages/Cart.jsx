import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../Axios";
import UserLayout from "../Layout/UserLayout";
import url from "../ImagePath";

const Cart = () => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Fetch cart
  const fetchCart = async () => {
    try {
      const { data } = await Axios.get("/cart", { withCredentials: true });
      const cartData = data.items?.[0] || { items: [], total: 0 };
      setCart({ items: cartData.items || [], total: cartData.total || 0 });
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403)
        setNotLoggedIn(true);
      setCart({ items: [], total: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Update quantity
  const updateQuantity = async (item, newQty) => {
    try {
      if (newQty <= 0) {
        await Axios.delete(`/cart/delete/${item.prodId}`, {
          withCredentials: true,
        });
      } else {
        await Axios.put(
          `/cart/${item.prodId}`,
          { quantity: newQty },
          { withCredentials: true }
        );
      }
      fetchCart();
    } catch (err) {
      setMsg("Failed to update cart");
      setTimeout(() => setMsg(""), 2000);
    }
  };

  const increase = (item) => updateQuantity(item, item.quantity + 1);
  const decrease = (item) => updateQuantity(item, item.quantity - 1);

  // Place order
  const placeOrder = async () => {
    if (!cart.items.length) return;
    if (!notLoggedIn) {
      try {
        const { data } = await Axios.post(
          "/orders",
          {},
          { withCredentials: true }
        );
        setMsg(data.message || "Order placed successfully!");
        setCart({ items: [], total: 0 });
        setTimeout(() => setMsg(""), 3000);
        navigate("/orders");
      } catch {
        setMsg("Failed to place order");
        setTimeout(() => setMsg(""), 3000);
      }
    }
  };

  if (loading) return <p className="p-6 text-center">Loading cart...</p>;

  if (notLoggedIn)
    return (
      <UserLayout>
        <div className="p-6 max-w-md mx-auto bg-white rounded shadow text-center mt-6">
          <h2 className="text-xl font-bold mb-2">Please Login</h2>
          <p className="text-gray-600 mb-4">
            You need to login to view your cart
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </UserLayout>
    );

  if (!cart.items.length)
    return <p className="p-6 text-center text-gray-500">Your cart is empty</p>;

  return (
    <UserLayout>
      <div className="p-6 flex flex-col items-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        {cart.items.map((item) => (
          <div
            key={item._id}
            className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded shadow mb-4 w-full max-w-3xl"
          >
            <div className="flex items-center gap-4">
              <img
                src={
                  item.image
                    ? Array.isArray(item.image)
                      ? `${url}/${item.image[0]}`
                      : `${url}/${item.image}`
                    : "/placeholder.png"
                }
                alt={item.productName}
                className="w-20 h-20 object-cover rounded"
              />

              <div>
                <h2 className="font-semibold">{item.productName}</h2>
                <p className="text-gray-600">Price: ₹{item.price}</p>
                <p className="text-gray-500 text-sm">
                  Subtotal: ₹{item.subtotal || item.price * item.quantity}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <button
                onClick={() => decrease(item)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => increase(item)}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                +
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center bg-white p-4 rounded shadow w-full max-w-3xl mt-4">
          <p className="text-xl font-bold">Total: ₹{cart.total}</p>
          <button
            onClick={placeOrder}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Place Order
          </button>
        </div>

        {msg && <p className="mt-4 text-green-600 font-medium">{msg}</p>}
      </div>
    </UserLayout>
  );
};

export default Cart;
