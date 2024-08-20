import { Button } from "antd";
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const BroadcastPage = () => {
  const { logOut } = useContext(AuthContext);
  const handleClick = async () => {
    await logOut();
  };
  return (
    <div>
      BroadcastPage
      <Button type="primary" onClick={handleClick}>
        logOut
      </Button>
    </div>
  );
};

export default BroadcastPage;
