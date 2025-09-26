import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Axios from "../../Axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const getProduct = useCallback(async () => {
    const res = await Axios.get(`/products/${id}`);
    setProduct(res.data);
  }, [id]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  if (!product) return <p>Loading...</p>;

  return (
    <section className="py-12 container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-96 object-cover rounded-lg shadow-md"
        />
        <div>
          <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
          <p className="text-xl text-gray-800 mb-4">₹{product.price}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
