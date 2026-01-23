import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-800">
      <Header />

      {/* 🔥 THIS FIXES PADDING ISSUES */}
      <main className="flex-1 w-full">
        {children}
      </main>

      <ToastContainer />
      <Footer />
    </div>
  );
};

export default Layout;