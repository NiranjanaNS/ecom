// src/components/UserPages/Category.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../../Axios";
import UserLayout from "../Layout/UserLayout";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get("/categories")
      .then((res) => setCategories(res.data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center p-6">Loading categories...</p>;

  return (
    <UserLayout>
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              to={`/categories/${cat._id}`}
              className="p-4 border rounded-lg shadow hover:shadow-lg bg-white text-center"
            >
              <h3 className="text-lg font-semibold">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default Category;
