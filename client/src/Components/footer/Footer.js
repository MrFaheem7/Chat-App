import React from "react";
import { Layout, Row, Col } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import "./Footer.scss";

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer className="footer">
      <Row justify="space-between" align="middle">
        <Col xs={24} sm={12} md={8}>
          <h3>Chat App</h3>
          <p>Connecting the world, one message at a time.</p>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms">Terms of Service</a>
            </li>
          </ul>
        </Col>
        <Col xs={24} sm={24} md={8} className="social-icons">
          <h4>Follow Us</h4>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookOutlined />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterOutlined />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramOutlined />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubOutlined />
          </a>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: "20px" }}>
        <Col>
          <p>
            &copy; {new Date().getFullYear()} Chat App. All rights reserved.
          </p>
        </Col>
      </Row>
    </Footer>
  );
};

export default AppFooter;
