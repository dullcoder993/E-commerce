import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from '../components/Layout';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/product/getAllProduct",
          { withCredentials: true }
        );
        setProducts(res.data.data);
      } catch (err) {
        console.log(err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  if (loading) return <div className="p-6">Loading products...</div>;

  return (
    <Layout>
    <div className="min-h-screen bg-slate-800 px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            onClick={() => navigate(`/productDetails/${p._id}`)}
            className="bg-slate-900/70 p-4 rounded-lg cursor-pointer hover:scale-[1.02] transition"
          >
            
            <img
              src={p.image}
              alt={p.name}
              className="aspect-square w-full object-cover rounded mb-3"
            />

            <h3 className="text-white font-medium">{p.name}</h3>
            <p className="text-orange-400">₹{p.price}</p>
          </div>
        ))}
      </div>
    </div>
    </Layout>
  );
};

export default Products;
