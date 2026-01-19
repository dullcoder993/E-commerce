import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav className="w-full text-white shadow-md bg-gray-900/90 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold justify-between">
          ShopX
        </Link>

        {/* Center Links */}
        <div className="flex items-center gap-8 text-xl font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `pb-1 ${
                isActive
                  ? "border-b-2 border-orange-500 text-orange-500"
                  : "hover:text-orange-400"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/product"
            className={({ isActive }) =>
              `pb-1 ${
                isActive
                  ? "border-b-2 border-orange-500 text-orange-500"
                  : "hover:text-orange-400"
              }`
            }
          >
            Products
          </NavLink>

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

          <NavLink
            to="/cart-items"
            className={({ isActive }) =>
              `pb-1 ${
                isActive
                  ? "border-b-2 border-orange-500 text-orange-500"
                  : "hover:text-orange-400"
              }`
            }
          >
            Orders
          </NavLink>
        </div>


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
        </div>
      </div>
    </nav>
  );
};

export default Header;
