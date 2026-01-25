import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AddProductModal from "./AddProduct.jsx";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/product/getAllProduct",
        { withCredentials: true }
      );
      setProducts(res.data.data);
    } catch {
      toast.error("Failed to load products");
    }
  };
  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/v1/product/c/delete/${id}`,
        { withCredentials: true }
      );
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product deleted");
    } catch {
      toast.error("Failed to delete product");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Products</h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-orange-500 rounded hover:bg-orange-600"
        >
          + Add Product
        </button>
      </div>

      {/* Product List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-slate-800 p-4 rounded flex justify-between items-start"
          >
            <div className="flex items-center gap-4">
              <img
                src={p.image?.[0]}
                alt={p.name}
                className="w-16 h-16 object-cover rounded"
              />

              <div>
                <h3 className="font-medium">{p.name}</h3>
                <p className="text-orange-400">₹{p.price}</p>
              </div>
            </div>

            <button
              onClick={() => deleteProduct(p._id)}
              className="text-sm bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <AddProductModal
          onClose={() => setShowModal(false)}
          onAdded={(product) =>
            setProducts((prev) => [...prev, product])
          }
        />
      )}
    </div>
  );
};

export default AdminProducts;
