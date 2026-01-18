import React from 'react'
import Layout from '../components/Layout'
import { useState } from 'react'
import {useNavigate} from "react-router-dom"
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const Register = () =>{
  const navigate = useNavigate()
  const [name,setName] = useState("");
  const [email,setEmail] = useState("")
  const [mobile,setMobile] = useState("")
  const [address,setAddress] = useState("")
  const [password,setPassword] = useState("")
  const [username,setUsername] = useState("")
  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(name,email,mobile,address,password,username)
    toast.success('Register Successfull.')
  }
  return(
    <Layout title="Register-Ecommerce App">
      <div className='min-h-screen flex items-center justify-center bg-gray-100 '>
        
        <form onSubmit={handleSubmit}>
          
          <div className='bg-white p-6 rounded shadow-md w-full max-w-sm'>
            <input
              type='text'
              value={name}
              className='w-full mb-3 p-2 border rounded'
              onChange={(e)=>setName(e.target.value)}
              placeholder='Enter Your Name'
              required
            />
          </div>
          <br/>
          <div>
            <input
            type='email'
            value={email}
            className='w-full mb-3 p-2 border rounded'
            onChange={(e)=>setEmail(e.target.value)}
            placeholder='Enter Email'
            required
            />
          </div>
          <br/>
          <div>
            <input
            type='text'
            value={username}
            className='w-full mb-3 p-2 border rounded'
            onChange={(e)=>setUsername(e.target.value)}
            placeholder='Enter Username'
            required
            />
          </div>
          <br/>
          <div>
            <input
            type='password'
            value={password}
            className='w-full mb-3 p-2 border rounded'
            onChange={(e)=>setPassword(e.target.value)}
            placeholder='Enter password'
            required
            />
          </div>
          <br/>
          <div>
            <input
            type='text'
            value={mobile}
            className='w-full mb-3 p-2 border rounded'
            onChange={(e)=>setMobile(e.target.value)}
            placeholder='Enter mobile No'
            required
            />
          </div>
          <br/>
          <div>
            <input
            type='text'
            value={address}
            className='w-full mb-3 p-2 border rounded'
            onChange={(e)=>setAddress(e.target.value)}
            placeholder='Enter Address'
            required
            />
          </div>
          <br/>
          <div>
             <button
          
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >Submit
        </button>
          </div>
        </form>

      </div>
      <p className="mt-4 text-l text-gray-600 text-center">
    Already have an account?{" "}
    <Link
    to="/login"
    className="text-orange-500 hover:underline font-medium"
    >
    Login here
    </Link>
  </p>
    </Layout>
  )
}



export default Register
