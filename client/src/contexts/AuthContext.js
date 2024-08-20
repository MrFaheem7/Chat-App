import axios from "axios";
import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await axios.get(`http://localhost:3000/api/auth/user`, {
          headers: {
            "x-auth-token": token,
          },
        });
        setUser(res.data);
      }
    } catch (err) {
      console.error("Failed to Fetch User ", err);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (name, email, password, image) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("image", image);
      const res = await axios.post(
        `http://localhost:3000/api/auth/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
      setLoading(false);
      toast.success(res.data.msg);
      navigate("/login");
    } catch (err) {
      setLoading(false);
      console.error("Failed to Register ", err);
      throw err;
    }
  };
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });
      setLoading(false);
      setUser(res.data);
      console.log(user);
      toast.success("Login successful");
      localStorage.setItem("token", res.data.token);

      navigate("/broadcast");
    } catch (err) {
      console.error("Failed to Login ", err);
      setLoading(false);
      if (err.response) {
        console.error(
          `Login failed: ${err.response.data.msg || "Bad Request"}`
        );
      } else {
        console.error("Failed to Login");
      }
      throw err;
    }
  };
  const logOut = async () => {
    try {
      let token = localStorage.getItem("token");
      console.log(token);
      const res = await axios.post(
        `http://localhost:3000/api/auth/logout`,
        {}, // empty body
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      setUser(null);
      localStorage.removeItem("token");
      navigate("/login");
      toast.success(res.data.msg);
    } catch (err) {
      toast.error(err.response.data.msg || "Bad Request");
      console.error("Failed to LogOut ", err);
    }
  };
  const forgetPassword = async (email) => {
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/auth/forget-password",
        {
          email,
        }
      );
      setLoading(false);
      console.log(res.data);
      toast.success(res.data.msg);
      navigate("/reset-password");
    } catch (err) {
      console.error("Failed to send email", err);
      toast.error(err.response.data.msg || "Bad Request");
      setLoading(false);
      throw err;
    }
  };
  const resetPassword = async (otp, newPassword) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/reset-password",
        {
          otp,
          newPassword,
        }
      );
      console.log(res.data);
      toast.success(res.data.msg);
      navigate("/login");
    } catch (err) {
      console.error("Failed to reset password", err);

      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        login,
        logOut,
        forgetPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
