// src/Layout/UserLayout.jsx
import React from "react";
import NavBar from "../UserPages/NavBar";

const UserLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default UserLayout;
