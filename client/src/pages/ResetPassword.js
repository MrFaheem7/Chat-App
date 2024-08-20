import React from "react";
import ResetPasswordForm from "../Components/forms/ResetPasswordForm";

const ResetPassword = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPassword;
