import React, { useEffect, useState } from "react";
import AdminLayout from "../Layout/AdminLayout";
import Axios from "../../Axios";
import url from "../ImagePath";

const ProductList = () => {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  // Fetch categories
  const getCategories = async () => {
    try {
      const res = await Axios.get("/categories/admin/categories");
      setCategories(res.data.categories || res.data);
      setCategoriesLoaded(true);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Fetch products
  const getProd = async () => {
    try {
      const res = await Axios.get("/products/admin/products");
      setItems(res.data.products || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    getCategories();
    getProd();
  }, []);

  // Reset form
  const resetForm = () => {
    setName("");
    setPrice("");
    setBrand("");
    setCategory("");
    setDescription("");
    setImageFiles([]);
    setPreviewImages([]);
    setShow(false);
    setEdit(false);
    setId(null);
  };

  // Delete product
  const deleteProd = async (id) => {
    try {
      await Axios.delete(`/products/admin/products/${id}`, { withCredentials: true });
      getProd();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // Add product
  const addProd = async () => {
    try {
      const formData = new FormData();
      imageFiles.forEach((file) => formData.append("image", file));
      formData.append("name", name);
      formData.append("price", price);
      formData.append("categoryId", String(category));
      formData.append("brand", brand);
      formData.append("description", description);

      await Axios.post("/products/admin/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      resetForm();
      getProd();
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  // Edit product
  const editProd = async () => {
    try {
      if (!id) return console.error("No product selected for edit");

      const formData = new FormData();
      imageFiles.forEach((file) => formData.append("image", file));
      previewImages.forEach((img) => formData.append("existingImages", img));

      formData.append("name", name);
      formData.append("price", price);
      formData.append("categoryId", String(category));
      formData.append("brand", brand);
      formData.append("description", description);

      await Axios.put(`/products/admin/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      resetForm();
      getProd();
    } catch (err) {
      console.error("Error editing product:", err.response?.data || err);
    }
  };

  // Handle edit modal
  const handleEdit = (ele) => {
    setEdit(true);
    setId(ele._id);
    setName(ele.name || "");
    setPrice(ele.price || "");
    setBrand(ele.brand || "");
    setDescription(ele.description || "");
    setPreviewImages(ele.image || []);
    setImageFiles([]);
    setShow(false);

    const catId = ele.categoryId ? (typeof ele.categoryId === "object" ? ele.categoryId._id : ele.categoryId) : "";
    setCategory(catId);
  };

  // Get category name by ID
  const getCatName = (id) => {
    const categoryId = typeof id === "object" ? id._id : id;
    const cat = categories.find((c) => c._id === categoryId);
    return cat ? cat.name : "Unknown";
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Products</h1>
        <button
          onClick={() => setShow(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Product
        </button>
      </div>

      {categoriesLoaded && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 border-b">Image</th>
                <th className="px-6 py-3 border-b">Name</th>
                <th className="px-6 py-3 border-b">Price</th>
                <th className="px-6 py-3 border-b">Brand</th>
                <th className="px-6 py-3 border-b">Category</th>
                <th className="px-6 py-3 border-b">Description</th>
                <th className="px-6 py-3 border-b text-center">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((ele) => (
                <tr key={ele._id}>
                  <td className="px-6 py-4">
                    {ele.image && ele.image.length > 0 && (
                      <img src={`${url}/${ele.image[0]}`} alt={ele.name} className="h-16 w-16 object-cover rounded" />
                    )}
                  </td>
                  <td className="px-6 py-4">{ele.name}</td>
                  <td className="px-6 py-4">{ele.price}</td>
                  <td className="px-6 py-4">{ele.brand}</td>
                  <td className="px-6 py-4">{getCatName(ele.categoryId)}</td>
                  <td className="px-6 py-4">{ele.description}</td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button onClick={() => handleEdit(ele)} className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                      Edit
                    </button>
                    <button onClick={() => deleteProd(ele._id)} className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {(show || edit) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">{edit ? "Edit Product" : "Add Product"}</h2>

            {edit && previewImages.length > 0 && (
              <div className="flex gap-2 mb-3">
                {previewImages.map((img, index) => (
                  <div key={index} className="relative">
                    <img src={`${url}/${img}`} alt={`preview-${index}`} className="h-16 w-16 object-cover rounded" />
                    <button
                      onClick={() => setPreviewImages(previewImages.filter((_, i) => i !== index))}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <input type="file" multiple onChange={(e) => setImageFiles(Array.from(e.target.files))} className="w-full mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full mb-3 px-4 py-2 border rounded-md" />
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" className="w-full mb-3 px-4 py-2 border rounded-md" />
            <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Brand" className="w-full mb-3 px-4 py-2 border rounded-md" />
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full mb-3 px-4 py-2 border rounded-md">
              <option value="">Select Category</option>
              {categories.map((ele) => (
                <option key={ele._id} value={ele._id}>{ele.name}</option>
              ))}
            </select>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="w-full mb-4 px-4 py-2 border rounded-md" />

            <div className="flex justify-end gap-3">
              <button onClick={edit ? editProd : addProd} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                {edit ? "Save Changes" : "Add"}
              </button>
              <button onClick={resetForm} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">Close</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ProductList;
