import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { isAuth, loading } = useContext(AuthContext);
  if (loading) {
    return <div>Checking authentication...</div>;
  }
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;