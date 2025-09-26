import React, { useEffect, useState } from "react";
import Axios from "../../Axios";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const getCat = async () => {
    const cat = await Axios.get("/categories");
    setCategories(cat.data);
  };

  useEffect(() => {
    getCat();
  }, []);

  return (
    <section className="py-12 container mx-auto">
      <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat._id}
            onClick={() => navigate(`/categories/${cat._id}`)}
            className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={cat.img}
              alt={cat.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 text-center font-semibold">{cat.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Category;
