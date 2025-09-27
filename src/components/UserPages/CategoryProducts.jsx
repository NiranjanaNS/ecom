import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "../../Axios";
import UserLayout from "../Layout/UserLayout";

function CategoryProducts() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`/categories/${id}/products`)
      .then((res) => {
        setProducts(res.data.products || res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center">Loading products...</p>;
  if (!products.length)
    return <p className="text-center">No products found.</p>;

  return (
    <UserLayout>
      <div className="py-12 container mx-auto">
        <h2 className="text-2xl font-bold mb-6">Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              onClick={() => navigate(`/products/${product._id}`)}
              className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={`http://localhost:3000/uploads/${product.image[0]}`}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-gray-600">₹{product.price}</p>
                <p className="text-gray-500 text-sm">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </UserLayout>
  );
}

export default CategoryProducts;
