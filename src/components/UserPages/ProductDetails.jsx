// src/components/UserPages/ProductDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "../../Axios";
import UserLayout from "../Layout/UserLayout";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [addedMsg, setAddedMsg] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await Axios.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await Axios.post(
        "/cart",
        { prodId: product._id, quantity },
        { withCredentials: true }
      );

      setAddedMsg("Product successfully added to cart!");
      setTimeout(() => setAddedMsg(""), 3000);
    } catch (err) {
      console.error("Error adding to cart:", err.response || err);
      setAddedMsg("Failed to add product to cart.");
      setTimeout(() => setAddedMsg(""), 3000);
    }
  };

  if (!product)
    return <p className="p-6 text-center text-gray-500">Loading...</p>;

  return (
    <UserLayout>
      <div className="flex flex-col justify-center items-center min-h-screen p-6 bg-gray-100">
        <div className="flex flex-col justify-center items-center p-6 max-w-md w-full bg-white border rounded-lg shadow">
          <img
            src={`http://localhost:3000/uploads/${product.image[0]}`}
            alt={product.name}
            className="w-full h-64 object-cover rounded"
          />
          <h2 className="text-3xl font-bold mt-4 text-center">
            {product.name}
          </h2>
          <p className="text-gray-600 mt-2 text-center">
            {product.description}
          </p>
          <p className="text-green-600 font-bold text-xl mt-4 text-center">
            ₹{product.price}
          </p>

          <div className="flex items-center space-x-4 mt-4">
            <button
              onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
            >
              -
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Add to Cart
          </button>

          {addedMsg && (
            <p className="mt-2 text-center text-white bg-blue-500 px-3 py-1 rounded">
              {addedMsg}
            </p>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default ProductDetails;
