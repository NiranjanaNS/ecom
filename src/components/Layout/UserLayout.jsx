import React from "react";

const UserLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
};

export default UserLayout;
