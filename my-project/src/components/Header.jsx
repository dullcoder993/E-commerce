import { useContext } from "react";
import { AuthContext } from "../context/authContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink, Link} from "react-router-dom";

const Header = () => {
  const { isAuth, setIsAuth, loading,user} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/customer/logout",
        {},
        { withCredentials: true }
      );
      setIsAuth(false);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  

  if (loading) return null;

  return (
    
    <nav className="w-full text-white shadow-md bg-gray-900/90 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold justify-between">
          ShopX
        </Link>
        {/* Right Section */}
        {user?.role === "admin" && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive
                ? "text-orange-500 font-semibold"
                : "hover:text-orange-400"
            }
          >
            Admin
          </NavLink>
        )}
        {/* Right Section */}
        
        <div className="flex items-center gap-4">
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? "text-orange-400 text-lg"
                : "hover:text-orange-400 text-lg"
            }
          >
            🛒
          </NavLink>

          {!isAuth ? (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `pb-1 transition-all duration-200 ${
                    isActive
                      ? "border-b-2 border-orange-500 text-orange-500"
                      : "hover:text-orange-400"
                  }`
                }
              >
                Login
              </NavLink>

              <span className="text-gray-400">/</span>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `pb-1 transition-all duration-200 ${
                    isActive
                      ? "border-b-2 border-orange-500 text-orange-500"
                      : "hover:text-orange-400"
                  }`
                }
              >
                Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `pb-1 ${
                    isActive
                      ? "border-b-2 border-orange-500 text-orange-500"
                      : "hover:text-orange-400"
                  }`
                }
              >
                Profile
              </NavLink>

              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-500 pb-1 cursor-pointer"
              >
                Logout
              </button>
            </>
          )}
        </div>

      </div>
    </nav>
  );
};


export default Header;
