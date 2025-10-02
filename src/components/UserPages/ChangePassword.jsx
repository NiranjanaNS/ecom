import { useState } from "react";
import Axios from "../../Axios";
import UserLayout from "../Layout/UserLayout";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) return alert("Please fill all fields");
    setLoading(true);
    try {
      const { data } = await Axios.put(
        "user/changepassword",
        { oldPassword, newPassword },
        { withCredentials: true }
      );
      alert(data.message || "Password updated successfully");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Failed to change password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserLayout>

    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4">Change Password</h2>
      <input
        type="password"
        placeholder="Old Password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        className="border px-3 py-2 w-full mb-3 rounded"
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="border px-3 py-2 w-full mb-3 rounded"
      />
      <button
        onClick={handleChangePassword}
        className={`px-4 py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </div>
    </UserLayout>
  );
};

export default ChangePassword;
