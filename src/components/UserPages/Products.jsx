import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Axios from "../../Axios";
import UserLayout from "../Layout/UserLayout";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const getProducts = async () => {
    try {
      const res = await Axios.get("/products", { withCredentials: true });
      const data = Array.isArray(res.data) ? res.data : res.data.products || [];
      return data;
    } catch (err) {
      console.error("Error fetching products:", err);
      setErrorMsg("Failed to fetch products. Please try again later.");
      return [];
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <p className="p-6 text-center text-gray-500">Loading products...</p>;
  }

  if (errorMsg) {
    return <p className="p-6 text-center text-red-500">{errorMsg}</p>;
  }

  if (products.length === 0) {
    return <p className="p-6 text-center text-gray-500">No products found.</p>;
  }

  return (
    <UserLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id || Math.random()}
              product={{
                _id: product._id,
                name: product.name,
                price: product.price,
                description: product.description,
                image:
                  product.image && product.image.length > 0
                    ? `http://localhost:3000/uploads/${product.image[0]}`
                    : "/placeholder.png",
              }}
            />
          ))}
        </div>
      </div>
    </UserLayout>
  );
}

export default Products;
