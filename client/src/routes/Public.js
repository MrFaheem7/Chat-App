import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Spinner } from "../utils/Spinner";

const Public = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Spinner />;
  }

  return !user ? <Outlet /> : <Navigate to="/home" />;
};

export default Public;
