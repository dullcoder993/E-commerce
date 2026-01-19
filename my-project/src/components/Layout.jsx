import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify';
const Layout = (props) => {
  return (
    <div>
      <Header/>
      <main className="min-h-[80vh] bg-gradient-to-br from-[#2f3b4a] via-[#3f4f63] to-[#2b3440]">{props.children}</main>
      <ToastContainer />
      <Footer/>
    </div>
  )
}

export default Layout
