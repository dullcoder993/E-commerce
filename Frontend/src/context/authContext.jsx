import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth on app load / refresh
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          "https://e-commerce-2-vgum.onrender.com/api/v1/customer/me",
          { withCredentials: true }
        );

        if (res.data.success) {
          setIsAuth(true);
          setUser(res.data.data);
        } else {
          setIsAuth(false);
          setUser(null);
        }
      } catch (err) {
        setIsAuth(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};