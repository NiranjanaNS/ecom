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

  const fetchCart = async () => {
    try {
      const { data } = await Axios.get("/cart", { withCredentials: true });
      if (data.items && data.items.length > 0) {
        setCart({
          items: data.items[0].items || [],
          total: data.items[0].total || 0,
        });
      } else {
        setCart({ items: [], total: 0 });
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
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

  const updateQuantity = async (item, newQuantity) => {
    try {
      if (newQuantity <= 0) {
        await Axios.delete(`/cart/delete/${item.prodId}`, { withCredentials: true });
      } else {
        await Axios.put(
          `/cart/${item.prodId}`,
          { quantity: newQuantity },
          { withCredentials: true }
        );
      }
      fetchCart();
    } catch (err) {
      console.error("Error updating cart:", err);
      setMsg("Failed to update cart");
      setTimeout(() => setMsg(""), 2000);
    }
  };

  const increaseQuantity = (item) => {
    updateQuantity(item, item.quantity + 1);
  };

  const decreaseQuantity = (item) => {
    updateQuantity(item, item.quantity - 1);
  };

  const placeOrder = async () => {
    if (cart.items.length === 0) return;
    try {
      const { data } = await Axios.post("/orders", {}, { withCredentials: true });
      setMsg(data.message || "Order placed successfully!");
      setCart({ items: [], total: 0 });
      setTimeout(() => setMsg(""), 3000);
      navigate("/orders");
    } catch (err) {
      console.error("Error placing order:", err.response || err);
      setMsg("Failed to place order");
      setTimeout(() => setMsg(""), 3000);
    }
  };

  const getImageUrl = (image) => {
    if (!image) return "/default-product.png";
    const img = Array.isArray(image) ? image[0] : image;
    return img.startsWith("http") ? img : `${url}/${img}`;
  };

  if (loading) return <p className="p-6 text-center">Loading cart...</p>;

  if (notLoggedIn)
    return (
      <UserLayout>
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-6 flex flex-col items-center gap-4">
          <h2 className="text-xl font-bold">You need to login</h2>
          <p className="text-gray-600 text-center">Please login to view your cart</p>
          <div className="flex gap-4 mt-4">
            <button onClick={() => navigate("/login")} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Login</button>
            <button onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">Back</button>
          </div>
        </div>
      </UserLayout>
    );

  if (cart.items.length === 0)
    return <p className="p-6 text-center text-gray-500">Your cart is empty</p>;

  return (
    <UserLayout>
      <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        {cart.items.map((item) => (
          <div key={item._id} className="flex flex-col md:flex-row bg-white rounded-lg shadow p-4 mb-4 w-full max-w-4xl justify-between items-center">
            <div className="flex items-center gap-4">
              <img src={getImageUrl(item.image)} alt={item.productName} className="w-24 h-24 object-cover rounded" />
              <div>
                <h2 className="font-semibold text-lg">{item.productName}</h2>
                <p className="text-gray-600">Price: ₹{item.price}</p>
                <p className="text-gray-500 text-sm">Subtotal: ₹{item.subtotal || item.price * item.quantity}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <button onClick={() => decreaseQuantity(item)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">-</button>
              <span className="px-3">{item.quantity}</span>
              <button onClick={() => increaseQuantity(item)} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">+</button>
            </div>
          </div>
        ))}

        <div className="w-full max-w-4xl flex justify-between items-center bg-white rounded-lg shadow p-4 mt-4">
          <p className="text-xl font-bold">Total: ₹{cart.total}</p>
          <button onClick={placeOrder} className="px-6 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white">
            Place Order
          </button>
        </div>

        {msg && <p className="mt-4 text-center text-sm text-green-600 font-medium">{msg}</p>}
      </div>
    </UserLayout>
  );
};

export default Cart;
