// client/src/components/ForgetPasswordForm.js

import "./ForgetPasswordForm.scss";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgetPasswordSchema } from "../Schemas/ForgetPasswordSchema";
import { AuthContext } from "../../contexts/AuthContext";

const ForgetPasswordForm = () => {
  const { forgetPassword } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ForgetPasswordSchema),
  });

  const onSubmit = async (data) => {
    await forgetPassword(data.email);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="forget-password-form">
        <h2>| Forgot Your Password?</h2>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register("email")} />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <button type="submit">Send OTP</button>
      </form>
    </>
  );
};

export default ForgetPasswordForm;
