import React, { useContext } from "react";
import { Layout, Menu, Button } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  SendOutlined,
  WechatOutlined,
  MessageOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../../contexts/AuthContext";

const { Header } = Layout;

const Navbar = () => {
  const { logOut } = useContext(AuthContext);
  const handleClick = async () => {
    await logOut();
  };
  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/home">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<SendOutlined />}>
            <Link to="/private-chat/:userId">Private Chat</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<MessageOutlined />}>
            <Link to="/room-chat/:roomId">Rooms</Link>
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={<LogoutOutlined />}
            style={{ marginLeft: "auto" }}
            onClick={handleClick}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};

export default Navbar;
