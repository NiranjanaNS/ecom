import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../Axios";
import UserLayout from "../Layout/UserLayout";

const Cart = () => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const { data } = await Axios.get("/cart", { withCredentials: true });
      if (data.items && data.items.length > 0) {
        const cartData = data.items[0];
        setCart({
          items: cartData.items || [],
          total: cartData.total || 0,
        });
      } else {
        setCart({ items: [], total: 0 });
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
      setCart({ items: [], total: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (prodId, change) => {
    try {
      await Axios.post(
        "/cart",
        { prodId, quantity: change },
        { withCredentials: true }
      );
      fetchCart();
    } catch (err) {
      console.error("Error updating cart:", err);
      setMsg("Failed to update cart");
      setTimeout(() => setMsg(""), 2000);
    }
  };

  const placeOrder = async () => {
    try {
      const { data } = await Axios.post(
        "/orders",
        {},
        { withCredentials: true }
      );
      setMsg(data.message || "Order placed successfully!");
      setCart({ items: [], total: 0 });
      setTimeout(() => setMsg(""), 3000);
      navigate("/");
    } catch (err) {
      console.error("Error placing order:", err);
      setMsg("Failed to place order");
      setTimeout(() => setMsg(""), 3000);
    }
  };

  if (loading) return <p className="p-6 text-center">Loading cart...</p>;

  if (cart.items.length === 0)
    return <p className="p-6 text-center text-gray-500">Your cart is empty</p>;

  return (
    <UserLayout>
      <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Your Cart</h1>

          {cart.items.map((item) => (
            <div
              key={item.prodId}
              className="flex flex-col md:flex-row justify-between items-center border-b py-4 cursor-pointer hover:bg-gray-50"
              onClick={() => navigate(`/products/${item.prodId}`)}
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    item.image
                      ? Array.isArray(item.image)
                        ? `http://localhost:3000/uploads/${item.image[0]}`
                        : `http://localhost:3000/uploads/${item.image}`
                      : "/default-product.png"
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

              <div className="flex items-center gap-2 mt-2 md:mt-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateQuantity(item.prodId, -1);
                  }}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  -
                </button>
                <span className="px-3">{item.quantity}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateQuantity(item.prodId, 1);
                  }}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xl font-bold">Total: ₹{cart.total}</p>
            <button
              onClick={placeOrder}
              className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Place Order
            </button>
          </div>

          {msg && (
            <p className="mt-4 text-center text-sm text-green-600 font-medium">
              {msg}
            </p>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default Cart;
