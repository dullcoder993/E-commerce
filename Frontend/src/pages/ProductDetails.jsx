import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../components/Layout";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCartPicker, setShowCartPicker] = useState(false);
  const [carts, setCarts] = useState([]);
  const [loadingCarts, setLoadingCarts] = useState(false);

  useEffect(() => {
    const fetchDeatils = async ()=>  {
      try {
        const res = await axios.get
          (`https://e-commerce-2-vgum.onrender.com/api/v1/product/c/getProduct/${id}`,
            { withCredentials: true }
          );
          setProduct(res.data.data)
      }catch(error){
        console.log(error)
        setError("Somthing went wrong")
      }finally{
        setLoading(false);
      }};
      fetchDeatils();
  }, [id]);

  const addToCart = async () => {
    try {
      const res = await axios.post(
        `https://e-commerce-2-vgum.onrender.com/api/v1/cartItems/c/add/${id}`,
        { productId: product._id, quantity: 1 },
        { withCredentials: true }
      );
      console.log(res)
      toast.success(res.data);
    } catch {
      toast.error("failed to add");
    }
  };
  const openCartPicker = async () => {
    try {
      setLoadingCarts(true);
      const res = await axios.get(
        "https://e-commerce-2-vgum.onrender.com/api/v1/cart/getAllCart",
        { withCredentials: true }
      );
      setCarts(res.data.data);
      setShowCartPicker(true);
      toast.success(res.data.message)
    } catch {
      toast.error("Failed to load carts");
    } finally {
      setLoadingCarts(false);
    }
  };
  const addToSelectedCart = async (cart) => {
  try {
    await axios.post(
      `https://e-commerce-2-vgum.onrender.com/api/v1/cartItems/c/add/${cart._id}`,
      { productId: product._id },
      { withCredentials: true }
    );

    toast.success(`Added to ${cart.name}`);
    setShowCartPicker(false);
  } catch {
    toast.error("Failed to add product");
  }
};
  if (loading) return <div className="p-6">Loading...</div>;
  if (!product) return null;

  return (
    <Layout>
    {showCartPicker && (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-900 w-full max-w-md rounded-lg p-6 text-white">

        <h2 className="text-xl font-semibold mb-4">
          Choose a Cart
        </h2>

        {loadingCarts ? (
          <p className="text-slate-400">Loading carts...</p>
        ) : (
          <div className="space-y-3">
            {carts.map(cart => (
              <button
                key={cart._id}
                onClick={() => addToSelectedCart(cart)}
                className="w-full text-left p-3 rounded bg-slate-800 hover:bg-slate-700"
              >
                <div className="font-medium">{cart.name}</div>
                <div className="text-sm text-slate-400">
                  {cart.isActive ? "Active Cart" : "Inactive"}
                </div>
              </button>
            ))}
          </div>
        )}

        <button
          onClick={() => setShowCartPicker(false)}
          className="mt-4 text-sm text-slate-400 hover:text-white"
        >
          Cancel
        </button>
      </div>
    </div>
    )}
    <div className="min-h-screen bg-slate-800 flex justify-center pt-16">
      <div className="max-w-3xl w-full bg-slate-900/70 rounded-xl p-8 text-white">

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-900/70 rounded-lg p-4">
            <img
              src={product.image}
              alt={product.name}
              className="aspect-square w-full object-cover rounded mb-3 "
            />
          </div>
          <div>
            <h1 className="text-4xl font-semibold mb-2 text-center">{product.name}</h1>
            <p className="text-gray-400 text-xl mb-4">{product.discription}</p>
            <p className="text-orange-400 text-xl mb-4">₹{product.price}</p>
            <p className="text-orange-400 text-xl mb-4">{product.categoryId.name}</p>
            <p className="text-slate-300 mb-6">{product.description}</p>

            
          </div>
        </div>
      
      </div>
      <button
  onClick={() => openCartPicker()}
  className="px-6 py-2 bg-orange-500 rounded hover:bg-orange-600"
>
  Add to Cart
</button>
    </div>
    </Layout>
  );
};

export default ProductDetails;

