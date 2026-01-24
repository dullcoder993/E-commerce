import {Routes,Route} from 'react-router-dom'
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
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AuthRoute from './components/AuthRoute.jsx'


function App() {
  

  return (
    <>
      <Routes>
        <Route path='/register' element={<AuthRoute><Register/></AuthRoute>}/>
        <Route path='/login' element={<AuthRoute><Login/></AuthRoute>}/>
        <Route path='/' element={<ProtectedRoute><Product/></ProtectedRoute>}/>
        <Route path='/productDetails/:id' element={<ProtectedRoute><ProductDetails/></ProtectedRoute>}/>
        <Route path='/cart' element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
        <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        <Route path='/cartItems/:id' element={<ProtectedRoute><Orders/></ProtectedRoute>}/>
        <Route path='/Change' element={<AuthRoute><Change/></AuthRoute>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App
