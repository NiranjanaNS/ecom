import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../../Axios";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => setOpen(!open);

  const fetchUser = async () => {
    try {
      const { data } = await Axios.get("/profile", { withCredentials: true });
      setUser(data.user || data || null); 
    } catch (err) {
      setUser(null);
      console.error("Error fetching user:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await Axios.post("/logout", {}, { withCredentials: true }); 
    } catch (err) {
      console.error("Logout failed:", err);
    }
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">ShopEase</Link>

        <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
          <div className="w-6 h-1 bg-gray-600 my-1"></div>
          <div className="w-6 h-1 bg-gray-600 my-1"></div>
          <div className="w-6 h-1 bg-gray-600 my-1"></div>
        </div>

        <nav className={`md:flex gap-6 ${open ? "flex flex-col absolute top-16 left-0 w-full bg-white p-4" : "hidden"}`}>
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/categories" className="hover:text-blue-600">Categories</Link>
          <Link to="/products" className="hover:text-blue-600">Products List</Link>
          <Link to="/user-profile" className="hover:text-blue-600">Profile</Link>
          <Link to="/cart" className="hover:text-blue-600">My Cart</Link>
          <Link to="/orders" className="hover:text-blue-600">My Orders</Link>

          {!user ? (
            <>
              <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Login</Link>
              <Link to="/signup" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Sign Up</Link>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium hidden md:inline">Hi, {user.name}</span>
              <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Logout</button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
