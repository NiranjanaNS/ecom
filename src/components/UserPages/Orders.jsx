import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../Axios";
import UserLayout from "../Layout/UserLayout";
import url from "../ImagePath"; 

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      console.log("Fetching orders...");
      const { data } = await Axios.get("/orders", { withCredentials: true });
      console.log("Orders data:", data);

      if (!data?.orders) {
        setNotLoggedIn(true);
      } else {
        setOrders(
          data.orders.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      if (err.response?.status === 401 || err.response?.status === 403)
        setNotLoggedIn(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const cancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      console.log("Cancelling order:", orderId);
      await Axios.put(`/orders/${orderId}`, {}, { withCredentials: true });
      alert("Order cancelled successfully");
      fetchOrders();
    } catch (err) {
      console.error("Failed to cancel order:", err);
      alert("Failed to cancel order");
    }
  };

  const getImageUrl = (image) => {
    if (!image) return "/default-product.png";
    const img = Array.isArray(image) ? image[0] : image;
    return img.startsWith("http") ? img : `${url}/${img}`;
  };

  if (loading)
    return <p className="p-6 text-center text-gray-500">Loading orders...</p>;

  if (notLoggedIn)
    return (
      <UserLayout>
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-6 flex flex-col items-center gap-4">
          <h2 className="text-xl font-bold">You need to login</h2>
          <p className="text-gray-600 text-center">
            Please login to view your orders
          </p>
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Back
            </button>
          </div>
        </div>
      </UserLayout>
    );

  if (orders.length === 0)
    return (
      <UserLayout>
        <p className="p-6 text-center text-gray-500">No orders found.</p>
      </UserLayout>
    );

  return (
    <UserLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Your Orders</h1>

        {orders.map((order) => (
          <div
            key={order._id}
            className="p-4 border rounded-lg shadow bg-white mb-4"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Order ID: {order._id}</h2>
              <p className="text-sm text-gray-600">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <p>
              <strong>Status:</strong> {order.status || "Pending"}
            </p>

            <div className="mt-3">
              <p className="font-semibold mb-2">Products:</p>

              <ul className="space-y-3">
                {order.items?.map((item) => (
                  <li
                    key={item.prodId}
                    className="flex items-center gap-4 border-b pb-2"
                  >
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-gray-600 text-sm">
                        ₹{item.price} × {item.quantity} = ₹{item.subtotal}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-3 font-bold text-lg">Total: ₹{order.total}</p>

            {order.status?.toLowerCase() === "pending" && (
              <button
                onClick={() => cancelOrder(order._id)}
                className="mt-3 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Cancel Order
              </button>
            )}
          </div>
        ))}
      </div>
    </UserLayout>
  );
};

export default Orders;
