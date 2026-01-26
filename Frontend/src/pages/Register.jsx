import { useState } from "react";
import Layout from "../components/Layout";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios'

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const handleSubmit =async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post(`/api/v1/customer/register`,{name,email,password,mobile,address,username});

      if(res.data.success){
        navigate("/login");
        toast.success(res.data.message)
      }else{
        toast.error(res.data.message)
      }
    }catch(error){
      if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong. Please try again.");
    }
    }
  };

  return (
    <Layout title="Register - Ecommerce App" >
      <div className="min-h-screen flex items-center justify-center bg-gray-600 px-4 ">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-200 p-6 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-semibold text-center mb-6">
            Create Account
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="   Full Name"
              className="w-full px-4 py-2.5 rounded-md border border-gray-300 
           text-sm text-gray-800 placeholder-gray-400
           focus:outline-none focus:border-orange-500 
           focus:ring-2 focus:ring-orange-200 
           transition-all duration-200"
              required
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="   Email Address"
              className="w-full px-4 py-2.5 rounded-md border border-gray-300 
           text-sm text-gray-800 placeholder-gray-400
           focus:outline-none focus:border-orange-500 
           focus:ring-2 focus:ring-orange-200 
           transition-all duration-200"
              required
            />

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="   Username"
              className="w-full px-4 py-2.5 rounded-md border border-gray-300 
           text-sm text-gray-800 placeholder-gray-400
           focus:outline-none focus:border-orange-500 
           focus:ring-2 focus:ring-orange-200 
           transition-all duration-200"
              required
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="   Password"
              className="w-full px-4 py-2.5 rounded-md border border-gray-300 
           text-sm text-gray-800 placeholder-gray-400
           focus:outline-none focus:border-orange-500 
           focus:ring-2 focus:ring-orange-200 
           transition-all duration-200"
              required
            />

            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="   Mobile Number"
              className="w-full px-4 py-2.5 rounded-md border border-gray-300 
           text-sm text-gray-800 placeholder-gray-400
           focus:outline-none focus:border-orange-500 
           focus:ring-2 focus:ring-orange-200 
           transition-all duration-200"
              required
            />

            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="   Address"
              className="w-full px-4 py-2.5 rounded-md border border-gray-300 
           text-sm text-gray-800 placeholder-gray-400
           focus:outline-none focus:border-orange-500 
           focus:ring-2 focus:ring-orange-200 
           transition-all duration-200"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
          >
            Register
          </button>

          <p className="mt-4 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-500 hover:underline font-medium"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
