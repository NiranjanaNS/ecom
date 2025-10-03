import React, { useEffect, useState } from "react";
import AdminLayout from "../Layout/AdminLayout";
import Axios from "../../Axios";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);

  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // get categories
  const getCategories = async () => {
    try {
      const res = await Axios.get("/categories/admin/categories");
      setCategories(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // get products
  const getProducts = async () => {
    try {
      const res = await Axios.get("/products/admin/products");
      // sort: newest first
      const sorted = res.data.sort(
        (a, b) => new Date(b.created_on) - new Date(a.created_on)
      );
      setProducts(sorted);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  // delete category
  const deleteCategory = async (id) => {
    try {
      await Axios.delete(`/categories/admin/categories/${id}`);
      getCategories();
    } catch (error) {
      console.error(error);
    }
  };

  // add category
  const addCategory = async () => {
    const data = { name, description };
    await Axios.post("/categories/admin/categories", data);
    getCategories();
    setShow(false);
    setName("");
    setDescription("");
  };

  // handle edit
  const handleEdit = (cat) => {
    setEdit(true);
    setId(cat._id);
    setName(cat.name);
    setDescription(cat.description);
  };

  // edit category
  const editCategory = async () => {
    const data = { name, description };
    await Axios.put(`/categories/admin/categories/${id}`, data);
    getCategories();
    setEdit(false);
    setId(null);
    setName("");
    setDescription("");
  };

  return (
    <AdminLayout>
      {/* Category Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Categories</h1>
        <button
          onClick={() => setShow(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Category
        </button>
      </div>

      <div className="overflow-x-auto mb-10">
        <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b">
                Description
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-600 uppercase tracking-wider border-b">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((cat) => (
              <tr key={cat._id}>
                <td className="px-6 py-4 text-sm text-gray-800">{cat.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {cat.description}
                </td>
                <td className="px-6 py-4 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCategory(cat._id)}
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Products Section */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Products</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b">
                Price
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b">
                Category
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b">
                Brand
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((prod) => (
              <tr key={prod._id}>
                <td className="px-6 py-4 text-sm text-gray-800">{prod.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  ₹{prod.price}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {prod.categoryId?.name || "N/A"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {prod.brand || "-"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {prod.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Category Modal */}
      {show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Add Category
            </h2>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category Name"
              className="w-full mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={addCategory}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Add
              </button>
              <button
                onClick={() => setShow(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {edit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Edit Category
            </h2>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category Name"
              className="w-full mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={editCategory}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => setEdit(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default CategoryList;
