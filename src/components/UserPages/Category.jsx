// src/components/UserPages/Category.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../../Axios";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()

  useEffect(() => {
    Axios.get("/categories")
      .then((res) => setCategories(res.data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center p-6">Loading categories...</p>;

  return (
      <div className="p-6 max-w-6xl mx-auto">
        <button onClick={() => navigate(-1)}>Back</button>
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
  );
};

export default Category;
