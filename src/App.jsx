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
import Auth from "./components/Auth";
import UserAuth from "./components/UserAuth";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/categories/:id" element={<CategoryProducts />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/cart" element={<UserAuth><Cart /></UserAuth>} />
        <Route path="/orders" element={<UserAuth><Orders /></UserAuth>} />
        <Route path="/user-profile" element={<UserAuth><UserProfile /></UserAuth>} />
        <Route path="/change-password" element={<UserAuth><ChangePassword /></UserAuth>} />

        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Auth><HomePage /></Auth>} />
        <Route path="/admin/user" element={<Auth><UserList /></Auth>} />
        <Route path="/admin/products" element={<Auth><ProductList /></Auth>} />
        <Route path="/admin/category" element={<Auth><CategoryList /></Auth>} />
        <Route path="/admin/order" element={<Auth><OrderStatus /></Auth>} />
      </Routes>
    </Router>
  );
};

export default App;
