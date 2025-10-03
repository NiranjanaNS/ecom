import React, { useEffect, useState } from "react";
import AdminLayout from "../Layout/AdminLayout";
import Axios from "../../Axios";

const OrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOrders = async () => {
    try {
      setLoading(true);
      const res = await Axios.get("/orders/admin/orders");
      const sortedOrders = (res.data.orders || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setOrders(sortedOrders);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const getAllowedStatuses = (currentStatus) => {
    switch (currentStatus) {
      case "pending":
        return ["pending", "shipped", "cancelled"];
      case "shipped":
        return ["shipped", "delivered"];
      case "delivered":
        return ["delivered"];
      case "cancelled":
        return ["cancelled"];
      default:
        return ["pending", "shipped", "delivered", "cancelled"];
    }
  };

  const updateStatus = async (orderId, newStatus, currentStatus) => {
    if (newStatus === currentStatus) return;
    try {
      await Axios.put(`/orders/admin/orders/${orderId}`, { status: newStatus });
      getOrders();
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  const deleteOrder = async (orderId, status) => {
    if (status !== "cancelled") return;
    try {
      await Axios.delete(`/orders/admin/orders/${orderId}`);
      getOrders();
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  const rows = orders.flatMap(order =>
    (order.items || []).map((item, index) => ({ order, item, index }))
  );

  return (
    <AdminLayout>
      <div className="overflow-x-auto bg-gray-100 p-6 min-h-screen">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">All Orders</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
            <thead className="bg-gray-200 text-gray-700 text-sm uppercase">
              <tr>
                <th className="py-3 px-4 border">Order ID</th>
                <th className="py-3 px-4 border">User</th>
                <th className="py-3 px-4 border">Product Name</th>
                <th className="py-3 px-4 border">Price</th>
                <th className="py-3 px-4 border">Quantity</th>
                <th className="py-3 px-4 border">Subtotal</th>
                <th className="py-3 px-4 border">Created Date</th>
                <th className="py-3 px-4 border">Status</th>
                <th className="py-3 px-4 border">Action</th>
              </tr>
            </thead>

            <tbody className="text-sm text-gray-700">
              {loading ? (
                <tr>
                  <td colSpan="9" className="text-center py-6">
                    Loading orders...
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-6 text-gray-500">
                    No orders found.
                  </td>
                </tr>
              ) : (
                rows.map(({ order, item, index }) => (
                  <tr key={`${order._id}-${index}`} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-4 border">{order._id}</td>
                    <td className="py-3 px-4 border">
                      {order.userId?.name || order.userId?._id || "Unknown"}
                    </td>
                    <td className="py-3 px-4 border">{item.productName || "Unknown"}</td>
                    <td className="py-3 px-4 border">₹{item.price || 0}</td>
                    <td className="py-3 px-4 border">{item.quantity || 0}</td>
                    <td className="py-3 px-4 border">₹{item.subtotal || 0}</td>
                    <td className="py-3 px-4 border">{new Date(order.createdAt).toLocaleString()}</td>
                    <td className="py-3 px-4 border">
                      <select
                        value={order.status || "pending"}
                        onChange={(e) => updateStatus(order._id, e.target.value, order.status)}
                        className="border rounded px-2 py-1"
                        disabled={order.status === "cancelled"}
                      >
                        {getAllowedStatuses(order.status).map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4 border">
                      <button
                        onClick={() => deleteOrder(order._id, order.status)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        disabled={order.status !== "cancelled"}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrderStatus;
