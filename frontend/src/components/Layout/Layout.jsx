import React from "react";
import Navbar from "../Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
};

export default Layout;
