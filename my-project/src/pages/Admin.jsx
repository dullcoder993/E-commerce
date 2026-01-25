import { useState } from "react";
import Layout from "../components/Layout";
import AdminProducts from "../components/Admin/AdminProducts.jsx";
import AdminUsers from "../components/Admin/AdminUsers.jsx";


const Admin = () => {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <Layout>
    <div className="min-h-screen bg-slate-800 text-white px-6 py-8">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <h1 className="text-3xl font-semibold mb-8 text-orange-400">
          Admin Dashboard
        </h1>

        {/* Tabs */}
        <div className="flex gap-6 mb-8 border-b border-slate-700">
          <button
            onClick={() => setActiveTab("products")}
            className={`pb-2 ${
              activeTab === "products"
                ? "border-b-2 border-orange-500 text-orange-400"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Products
          </button>

          <button
            onClick={() => setActiveTab("users")}
            className={`pb-2 ${
              activeTab === "users"
                ? "border-b-2 border-orange-500 text-orange-400"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Users
          </button>
        </div>

        {/* Content */}
        <div className="bg-slate-900 rounded-lg p-6">
          {activeTab === "products" && <AdminProducts />}

          {activeTab === "users" && <AdminUsers />}
        </div>

      </div>
    </div>
    </Layout>
  );
};

export default Admin;
