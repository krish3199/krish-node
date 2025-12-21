/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (formData) => {
    setLoading(true);
    const res = await api.post("/auth/login", formData);
    setUser(res.data.user || { email: formData.email });
    setLoading(false);
    return res.data;
  };

  const signup = async (formData) => {
    setLoading(true);
    const res = await api.post("/auth/register", formData);
    setLoading(false);
    return res.data;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
