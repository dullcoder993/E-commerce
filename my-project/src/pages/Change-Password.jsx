import React from 'react'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Change = () => {
  const navigate = useNavigate();
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
   const handleSubmit =async (e) => {
    e.preventDefault();
    try{
      const res = await axios.patch(`http://localhost:8000/api/v1/customer/change-password`,{password,confirmPassword},
        { withCredentials: true }
      );
      console.log(res)
      if(res.data.success){
            navigate("/product");
            toast.success(res.data.message)
          }else{
            toast.error(res.data.message)
          }
        }catch(error){
          if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          console.log(error)
          toast.error("Something went wrong. Please try again.");
        }
        }
      }
    
  return (
    <div>
      <Layout title="Register - Ecommerce App">
      <div className="min-h-screen flex items-center justify-center bg-gray-600 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-semibold text-center mb-6">
            Login
          </h2>

          <div className="space-y-4">
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
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="   ConfirmPassword"
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
            Submit
          </button>
          <p className="mt-4 text-sm text-gray-600 text-center">
                  New Here?{" "}
                  <Link
                    to="/register"
                    className="text-orange-500 hover:underline font-medium"
                  >
                    Register
                  </Link>
                </p>
        </form>
      </div>
      
    </Layout>
    </div>
  )
}

export default Change

