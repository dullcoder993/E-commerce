import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { isAuth, loading } = useContext(AuthContext);

  // 🔥 CRITICAL LINE
  if (loading) {
    return <div>Checking authentication...</div>;
  }
  console.log(isAuth)
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;