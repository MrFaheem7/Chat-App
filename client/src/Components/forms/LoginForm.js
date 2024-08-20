// client/src/components/LoginForm.js

import "./LoginForm.scss";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../Schemas/LoginSchema";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data) => {
    await login(data.email, data.password).catch((err) => {
      console.error(err);
      toast.error(err.response.data.msg || "Bad Request");
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <h2>| Login to Your Account</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register("email")} />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" {...register("password")} />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>

        <button type="submit">Login</button>
        <div className="links">
          <Link to="/register">
            <span>Don't have an account? </span>
          </Link>
          <Link to="/forget-password">
            <span>Forgot Password?</span>
          </Link>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
