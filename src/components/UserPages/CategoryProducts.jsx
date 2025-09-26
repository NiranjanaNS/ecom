import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "../../Axios";

const CategoryProducts = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getProducts = useCallback(async () => {
    const res = await Axios.get(`/categories/${id}/products`);
    setProducts(res.data);
  }, [id]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <section className="py-12 container mx-auto">
      <h2 className="text-2xl font-bold mb-6">Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            onClick={() => navigate(`/products/${product._id}`)}
            className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-gray-600">₹{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryProducts;
