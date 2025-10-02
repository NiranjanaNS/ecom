import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../Axios";
import UserLayout from "../Layout/UserLayout";
import img from "../../assets/164bcf42-ff2f-454a-b671-02b8aa6eb433.jpg"
import url from "../ImagePath";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Fetch user profile from backend
  const fetchUser = async () => {
    try {
      const { data } = await Axios.get("/profile", { withCredentials: true });

      if (!data || !data.user) {
        setNotLoggedIn(true);
        setUser(null);
        setProfilePic(null);
      } else {
        setUser(data.user);
        setProfilePic(data.user.image || null);
      }
    } catch (err) {
      console.error("Fetch user error:", err);
      setNotLoggedIn(true); 
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePicClick = () => fileInputRef.current.click();

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    uploadProfilePic(file);
  };

  // Upload profile picture
  const uploadProfilePic = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await Axios.put("/profile/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (data.image) {
        setProfilePic(data.image);
        setPreview(null);
        alert("Profile picture updated successfully!");
      } else {
        throw new Error("No image returned from server");
      }
    } catch (err) {
      console.error("Upload error:", err.response || err);
      alert("Failed to upload profile picture.");
      setPreview(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <p className="p-6 text-center">Loading profile...</p>;

  return (
    <UserLayout>
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-6">
        {notLoggedIn ? (
          <div className="flex flex-col items-center gap-4">
            <img
              src={img}
              alt="Default avatar"
              className="w-24 h-24 rounded-full object-cover"
            />
            <h2 className="text-xl font-bold">Guest User</h2>
            <p className="text-gray-600 text-center">
              You should login to view your profile
            </p>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Go to Login
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <img
              src={
                preview ||
                (profilePic
                  ? profilePic.startsWith("uploads/")
                    ? `${url}/${profilePic}`
                    : `${url}/${profilePic}`
                  : "/default-avatar.png")
              }
              alt={user?.name || "User"}
              className="w-24 h-24 rounded-full object-cover cursor-pointer hover:opacity-80"
              onClick={handleProfilePicClick}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleProfilePicChange}
              className="hidden"
            />

            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>

            <button
              onClick={() => navigate("/change-password")}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Change Password
            </button>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default UserProfile;
