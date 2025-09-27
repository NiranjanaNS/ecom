import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="h-full w-1/4 p-5 space-y-3 bg-gray-100 min-h-screen">
      <Link to="/admin/">
        <p className="cursor-pointer hover:text-blue-600">Home</p>
      </Link>
      <Link to="/admin/user">
        <p className="cursor-pointer hover:text-blue-600">User</p>
      </Link>
      <Link to="/admin/products">
        <p className="cursor-pointer hover:text-blue-600">Products</p>
      </Link>
      <Link to="/admin/category">
        <p className="cursor-pointer hover:text-blue-600">Category</p>
      </Link>
      <Link to="/admin/order">
        <p className="cursor-pointer hover:text-blue-600">Order</p>
      </Link>
    </div>
  );
};

export default AdminSidebar;
