import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddProduct = ({ onSuccess, onClose }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stockQty, setStockQty] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  // fetch categories
  useEffect(() => {
  fetchCategories();
}, []);

const fetchCategories = async () => {
  try {
    const res = await axios.get(
      "/api/v1/category/getAll",
      { withCredentials: true }
    );
    setCategories(res.data.data);
  } catch {
    toast.error("Failed to load categories");
  }
};


  const handleSubmit = async () => {
    if (!image || !categoryId) {
      toast.error("Image & Category required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("stockQty", stockQty);
      formData.append("categoryId", categoryId);
      formData.append("discription", description);
      formData.append("image", image); // backend makes array

      const res = await axios.post(
        "/api/v1/product/create",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Product added");
      onSuccess(res.data.data);
      onClose();
    } catch (err) {
      toast.error("Add product failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-900 p-6 rounded w-full max-w-md text-white">

        <h2 className="text-xl font-semibold mb-4">Add Product</h2>

        <input
          placeholder="Product name"
          className="w-full mb-3 p-2 bg-slate-800 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Price"
          type="number"
          className="w-full mb-3 p-2 bg-slate-800 rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          placeholder="Stock Quantity"
          type="number"
          className="w-full mb-3 p-2 bg-slate-800 rounded"
          value={stockQty}
          onChange={(e) => setStockQty(e.target.value)}
        />

        <select
          className="w-full mb-3 p-2 bg-slate-800 rounded"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Description"
          className="w-full mb-3 p-2 bg-slate-800 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          className="w-full mb-4 text-m bg-slate-800 rounded cursor-pointer"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-700 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-orange-500 rounded hover:bg-orange-600"
          >
            Add
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddProduct;
