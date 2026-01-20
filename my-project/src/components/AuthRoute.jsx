import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";
const AuthRoute = ({ children }) => {
  const { isAuth, loading } = useContext(AuthContext);

  if (loading) return null;
  
  if (isAuth === true) {
    return <Navigate to="/" replace />;
  }

  return children;
};



export default AuthRoute;
