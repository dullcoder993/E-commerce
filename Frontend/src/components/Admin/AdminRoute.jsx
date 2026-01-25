import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext.jsx";
import { useContext } from "react";

const AdminRoute = ({ children }) => {
  const { user, isAuth } = useContext(AuthContext);

  if (isAuth === null) return null; // loading
  if (!isAuth || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;