import React from "react";
import ForgetPasswordForm from "../Components/forms/ForgetPasswordForm";

const ForgetPassword = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <ForgetPasswordForm />
    </div>
  );
};

export default ForgetPassword;
