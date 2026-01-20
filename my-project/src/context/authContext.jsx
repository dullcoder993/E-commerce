// src/context/AuthContext.jsx
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null); // null = loading
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/customer/me", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success===200) {
          setIsAuth(true);
        }
        if(200 < res.data.success >400){
          setIsAuth(false);
        }
      })
      .catch(() => {
        setIsAuth(false);
      })
  }, []);
  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
