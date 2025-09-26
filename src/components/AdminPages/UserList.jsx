import React, { useEffect, useState } from "react";
import AdminLayout from "../Layout/AdminLayout";
import Axios from "../../Axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    try {
      setLoading(true);
      const res = await Axios.get("/admin/users");
      console.log("Fetched users:", res.data); // Check the array name here
      setUsers(res.data.user || []); // change users -> allUsers if needed
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      setLoading(false);
    }
  };

  const toggleStatus = async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      await Axios.put(`/admin/users/${userId}`, { status: newStatus });
      getUsers();
    } catch (err) {
      console.error("Error updating user status:", err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <AdminLayout>
      <div className="overflow-x-auto bg-gray-100 p-6 min-h-screen">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">User Management</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
            <thead className="bg-gray-200 text-gray-700 text-sm uppercase">
              <tr>
                <th className="py-3 px-4 border">Username</th>
                <th className="py-3 px-4 border">Email</th>
                <th className="py-3 px-4 border">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {loading ? (
                <tr>
                  <td colSpan="3" className="text-center py-6">
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-4 border">{user.name || "N/A"}</td>
                    <td className="py-3 px-4 border">{user.email || "N/A"}</td>
                    <td className="py-3 px-4 border text-center">
                      <button
                        onClick={() => toggleStatus(user._id, user.status)}
                        className={`px-3 py-1 rounded text-sm font-semibold ${
                          user.status === "active"
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-red-500 text-white hover:bg-red-600"
                        }`}
                      >
                        {user.status === "active" ? "Active" : "Inactive"}
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

export default UserList;
