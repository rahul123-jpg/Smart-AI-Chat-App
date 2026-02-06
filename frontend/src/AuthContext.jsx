import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);



  const login = async (email, password) => {
    const res = await axios.post("https://smart-ai-chat-app-1.onrender.com/api/login", {
      email,
      password },
   { withCredentials: true }
  );

    setUser(res.data.user);
  };

  
 const signup = async (email, password) => {
  try {
    const res = await axios.post(
      "https://smart-ai-chat-app-1.onrender.com/api/signup",
      { email, password },
      { withCredentials: true }
    );

    console.log("Signup response:", res.data);
    alert("Signup success!");

  } catch (err) {
    console.log("Frontend error 👉", err.response?.data || err.message);
    alert(err.response?.data?.error || "Signup failed");
  }
};



  const logout = async () => {
    await axios.get("https://smart-ai-chat-app-1.onrender.com/api/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
