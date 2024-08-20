// client/src/components/ResetPasswordForm.js

import "./ResetPasswordForm.scss";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchema } from "../Schemas/ResetPasswordSchema";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
const ResetPasswordForm = () => {
  const { resetPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit = async (data) => {
    await resetPassword(data.otp, data.newPassword).catch((err) => {
      console.error(err);
      toast.error(err.response.data.msg || "Bad Request");
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="reset-password-form">
        <div
          style={{
            cursor: "pointer",

            color: "white",
          }}
          onClick={() => navigate(-1)}
        >
          <FontAwesomeIcon icon={faArrowLeft} size="1x" color="white" />
          Back
        </div>
        <h2>| Reset Your Password</h2>
        <div className="form-group">
          <label htmlFor="otp">OTP</label>
          <input type="text" id="otp" {...register("otp")} />
          {errors.otp && <p className="error">{errors.otp.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            {...register("newPassword")}
          />
          {errors.newPassword && (
            <p className="error">{errors.newPassword.message}</p>
          )}
        </div>

        <button type="submit">Reset Password</button>
      </form>
    </>
  );
};

export default ResetPasswordForm;
