import {Routes,Route} from 'react-router-dom'
import Home from "./pages/Home"
import Register from "./pages/Register"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import Orders from "./pages/Orders"
import Product from "./pages/Product"
import ProductDetails from "./pages/ProductDetails"
import Profile from "./pages/Profile"
import { ToastContainer, toast } from 'react-toastify';
import Change from './pages/Change-Password'


function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/product' element={<Product/>}/>
        <Route path='/productDetails/:id' element={<ProductDetails/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/cart-items' element={<Orders/>}/>
        <Route path='/Change' element={<Change/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App
