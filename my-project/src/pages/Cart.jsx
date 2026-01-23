import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../components/Layout";

const Carts = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [newCartName, setNewCartName] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/cart/getAllCart",
          { withCredentials: true }
        );
        setCarts(res.data.data);
      } catch (err) {
        toast.error("Failed to load carts");
      } finally {
        setLoading(false);
      }
    };

    fetchCarts();
  }, []);
  const createCart = async () => {
  if (!newCartName.trim()) {
    toast.error("Cart name is required");
    return;
  }

  if (carts.length >= 5) {
    toast.error("You can only create up to 5 carts");
    return;
  }

  try {
    setCreating(true);

    const res = await axios.post(
      "http://localhost:8000/api/v1/cart/add",
      { name: newCartName },
      { withCredentials: true }
    );

    setCarts(prev => [...prev, res.data.data]);
    setNewCartName("");
    toast.success("Cart created");
  } catch {
    toast.error("Failed to create cart");
  } finally {
    setCreating(false);
  }
};
  const setActiveCart = async (cartId) => {
  try {
    await axios.patch(
      `http://localhost:8000/api/v1/carts/${cartId}/active`,
      {},
      { withCredentials: true }
    );

    setCarts(prev =>
      prev.map(c => ({
        ...c,
        isActive: c._id === cartId,
      }))
    );

    toast.success("Cart set as active");
  } catch {
    toast.error("Failed to set active cart");
  }
};
  
  const deleteCart = async (cartId) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/v1/cart/c/remove/${cartId}`,
        { withCredentials: true }
      );

      setCarts(prev => prev.filter(c => c._id !== cartId));
      toast.success("Cart deleted");
    } catch {
      toast.error("Failed to delete cart");
    }
  };

  if (loading) {
    return <div className="p-6 text-white">Loading carts...</div>;
  }

  return (
    <Layout>
      
    <div className="min-h-screen bg-slate-800 px-16 text-white">
  <div className="max-w-6xl w-full mx-auto px-8 py-4">
      <br/>
        {/* Page Title */}
        <h1 className="text-4xl font-semibold mb-8 text-orange-400 text-center">
          Your Carts
        </h1>
        <br/>
        <br/>
        {/* Create Cart Button */}
        
        <div className="flex gap-3 mb-8 text-2xl">
        <input
          type="text"
          value={newCartName}
          onChange={(e) => setNewCartName(e.target.value)}
          placeholder="New cart name"
          className="flex-1 px-4 py-2 rounded bg-slate-700 text-white outline-none"
        />

        <button
          onClick={createCart}
          disabled={creating || carts.length >= 5}
          className={`px-4 py-2 rounded ${
            creating || carts.length >= 5
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          Create
        </button>
      </div>
            <br/>
        {/* Cart List */}
        {carts.length === 0 ? (
          <p className="text-slate-400">No carts created yet.</p>
        ) : (
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8">
            {carts.map(cart => (
              <div
  key={cart._id}
  onClick={() => navigate(`/cart-items/${cart._id}`)}
  className="bg-slate-900 p-5 rounded-lg cursor-pointer hover:ring-2 hover:ring-orange-500 transition flex items-center justify-between"
>
  {/* LEFT SIDE (text) */}
  <div>
    <h2 className="text-2xl font-medium ">
      {cart.name}
    </h2>
    <p className="text-sm text-slate-400 mt-1">
      {cart.isActive ? "Active Cart" : "Inactive"}
    </p>
  </div>

  {/* RIGHT SIDE (buttons) */}
  <div className="flex gap-4">
    <button
      onClick={(e) => {
        e.stopPropagation();
        setActiveCart(cart._id);
      }}
      disabled={cart.isActive}
      className={`px-3 py-1 text-m rounded ${
        cart.isActive
          ? "bg-green-600 cursor-default"
          : "bg-slate-700 hover:bg-slate-600"
      }`}
    >
      {cart.isActive ? "Active" : "Set Active"}
    </button>

    <button
      onClick={(e) => {
        e.stopPropagation();
        deleteCart(cart._id);
      }}
      className="px-3 py-1 text-sm rounded bg-red-600 hover:bg-red-700 "
    >
      Delete
    </button>
  </div>
</div>

            ))}
          </div>
        )}

      </div>
    </div>
    </Layout>
  );
};

export default Carts;

