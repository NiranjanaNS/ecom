// src/components/UserPages/ProductDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "../../Axios";
import UserLayout from "../Layout/UserLayout";
import url from "../ImagePath";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [addedMsg, setAddedMsg] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await Axios.get(`/${id}`);
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
        "/",
        { prodId: product._id, quantity },
        { withCredentials: true }
      );
      setAddedMsg("Product successfully added to cart!");
      setTimeout(() => setAddedMsg(""), 3000);
    } catch (err) {
      console.error("Error adding to cart:", err.response || err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        // User not logged in
        setNotLoggedIn(true);
      } else {
        setAddedMsg("Failed to add product to cart.");
        setTimeout(() => setAddedMsg(""), 3000);
      }
    }
  };

  if (!product)
    return <p className="p-6 text-center text-gray-500">Loading...</p>;

  if (notLoggedIn) {
    return (
      <UserLayout>
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-6 flex flex-col items-center gap-4">
          <h2 className="text-xl font-bold">You need to login</h2>
          <p className="text-gray-600 text-center">
            Please login to add products to your cart
          </p>
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Go to Login
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Back
            </button>
          </div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="flex flex-col justify-center items-center min-h-screen p-6 bg-gray-100">
        <div className="flex flex-col justify-center items-center p-6 max-w-md w-full bg-white border rounded-lg shadow">
          <img
            src={product.image ? `${url}/${product.image[0]}` : "/default-product.png"}
            alt={product.name}
            className="w-full h-64 object-cover rounded"
          />
          <h2 className="text-3xl font-bold mt-4 text-center">{product.name}</h2>
          <p className="text-gray-600 mt-2 text-center">{product.description}</p>
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
