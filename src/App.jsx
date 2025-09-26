import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./components/UserPages/LogIn";
import SignUp from "./components/UserPages/SignUp";
import AdminSidebar from "./components/AdminSidebar";
import UserList from "./components/AdminPages/UserList";
import ProductList from "./components/AdminPages/ProductList";
import CategoryList from "./components/AdminPages/CategoryList";
import OrderStatus from "./components/AdminPages/OrderStatus";
import HomePage from "./components/AdminPages/HomePage";
import AdminLogin from "./components/AdminPages/AdminLogin";
import LandingPage from "./components/UserPages/LandingPage";
import Auth from "./components/Auth";
import CategoryProducts from "./components/UserPages/CategoryProducts";
import ProductDetails from "./components/UserPages/ProductDetails";

function App() {
  return (
    <Router>
      <Routes>
        {/* User */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/categories/:id" element={<CategoryProducts />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<Auth />}>
          <Route path="/admin/" element={<HomePage />} />
          <Route path="/admin/user" element={<UserList />} />
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/category" element={<CategoryList />} />
          <Route path="/admin/order" element={<OrderStatus />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
