import React from "react";
import "./PublicLayout.module.scss";

const PublicLayout = ({ children }) => {
  return (
    <div className="public-layout">
      <div className="content">{children}</div>
    </div>
  );
};

export default PublicLayout;
