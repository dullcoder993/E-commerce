import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../components/Layout";

const CartItems = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(
          `/api/v1/cartItems/c/getItems/${id}`,
          { withCredentials: true }
        );
        setItems(res.data.data);
      } catch {
        toast.error("Failed to load cart items");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [id]);

const addItem = async (itemId) => {
    try {
      setUpdatingId(itemId);
      const res = await axios.post(
        `/api/v1/cartItems/c/add/${id}`,
        {},
        { withCredentials: true }
      );
      setItems(prev =>
        prev.map(i => (i._id === itemId ? res.data.data : i))
      );
    } catch {
      toast.error("Failed to add item");
    } finally {
      setUpdatingId(null);
    }
  };
  const removeItem = async (itemId) => {
    try {
      setUpdatingId(itemId);
      const res = await axios.delete(
        `/api/v1/cartItems/c/remove/${id}`,
        { withCredentials: true }
      );

      if (!res.data.data) {
        // item deleted
        setItems(prev => prev.filter(i => i._id !== itemId));
      } else {
        setItems(prev =>
          prev.map(i => (i._id === itemId ? res.data.data : i))
        );
      }
    } catch {
      toast.error("Failed to remove item");
    } finally {
      setUpdatingId(null);
    }
  };
  if (loading) {
    return <div className="p-6 text-white">Loading cart...</div>;
  }

  if (items.length === 0) {
    return (
      <Layout>
      <div className="p-6 text-slate-400 text-lg">
        Cart is empty.
      </div>
      </Layout>
    );
  }

  return (
    <Layout>
    <div className="min-h-screen bg-slate-800 p-6 text-white">
      <div className="max-w-5xl mx-auto space-y-4">

        {items.map(item => (
          <div
            key={item._id}
            className="bg-slate-900 p-4 rounded-lg flex items-center justify-between"
          >
            {/* LEFT: Product info */}
            <div className="flex items-center gap-4">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="font-medium">{item.product.name}</h3>
                <p className="text-orange-400">
                  ₹{item.product.price}
                </p>
              </div>
            </div>

            {/* RIGHT: Quantity controls */}
            <div className="flex items-center gap-3">
              <button
                disabled={updatingId === item._id}
                onClick={() => removeItem(item._id)}
                className="px-3 py-1 bg-slate-700 rounded"
              >
                −
              </button>

              <span>{item.quantity}</span>

              <button
                disabled={updatingId === item._id}
                onClick={() => addItem(item._id)}
                className="px-3 py-1 bg-slate-700 rounded"
              >
                +
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
    </Layout>
  );
};

export default CartItems;