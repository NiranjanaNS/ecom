import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const imageUrl = product.image
    ? Array.isArray(product.image)
      ? `http://localhost:3000/uploads/${product.image[0]}`
      : product.image
    : "/placeholder.png";

  return (
    <div className="border rounded-lg p-4 bg-white shadow hover:shadow-lg transition">
      <img
        src={imageUrl}
        alt={product.name}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-gray-600">{product.description?.slice(0, 50)}...</p>
      <p className="text-green-600 font-bold mt-1">₹{product.price}</p>
      <Link
        to={`/products/${product._id}`}
        className="mt-2 inline-block bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
