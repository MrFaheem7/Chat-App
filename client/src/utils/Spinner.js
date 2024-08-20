import React from "react";
import { Spin } from "antd";

export const Spinner = () => (
  <Spin
    style={{
      marginInline: "auto",
      color: "#002b56",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  />
);
