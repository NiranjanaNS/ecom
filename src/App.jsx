import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LogIn from "./components/UserPages/LogIn";
import SignUp from "./components/UserPages/SignUp";
import LandingPage from "./components/UserPages/LandingPage";
import CategoryProducts from "./components/UserPages/CategoryProducts";
import ProductDetails from "./components/UserPages/ProductDetails";
import Category from "./components/UserPages/Category";
import Cart from "./components/UserPages/Cart";
import Orders from "./components/UserPages/Orders";
import UserProfile from "./components/UserPages/UserProfile";
import ChangePassword from "./components/UserPages/ChangePassword";
import Products from "./components/UserPages/Products";

import AdminLogin from "./components/AdminPages/AdminLogin";
import HomePage from "./components/AdminPages/HomePage";
import UserList from "./components/AdminPages/UserList";
import ProductList from "./components/AdminPages/ProductList";
import CategoryList from "./components/AdminPages/CategoryList";
import OrderStatus from "./components/AdminPages/OrderStatus";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/categories/:id" element={<CategoryProducts />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/change-password" element={<ChangePassword />} />

        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/" element={<HomePage />} />
        <Route path="/admin/user" element={<UserList />} />
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/category" element={<CategoryList />} />
        <Route path="/admin/order" element={<OrderStatus />} />
      </Routes>
    </Router>
  );
};

export default App;
