import { useEffect, useState } from "react";
import Axios from "../../Axios";
import UserLayout from "../Layout/UserLayout";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    try {
      const { data } = await Axios.get("/orders", { withCredentials: true });
      const userOrders = Array.isArray(data.orders)
        ? data.orders
        : data.orders || [];
      setOrders(
        userOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await Axios.put(`/orders/${orderId}`, {}, { withCredentials: true });
      alert("Order cancelled successfully");
      getOrders();
    } catch (err) {
      console.error("Error cancelling order:", err);
      alert("Failed to cancel order");
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  if (loading)
    return <p className="p-6 text-center text-gray-500">Loading orders...</p>;
  if (orders.length === 0)
    return <p className="p-6 text-center text-gray-500">No orders found.</p>;

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

            <div className="mt-2">
              <p className="font-semibold">Products:</p>
              <ul className="list-disc ml-6">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item) => (
                    <li key={item.prodId}>
                      {item.productName} - ₹{item.price} x {item.quantity} = ₹
                      {item.subtotal}
                    </li>
                  ))
                ) : (
                  <li>No products</li>
                )}
              </ul>
            </div>

            <p className="mt-2 font-bold">Total: ₹{order.total}</p>

            {order.status && order.status.toLowerCase() === "pending" && (
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
}

export default Orders;
