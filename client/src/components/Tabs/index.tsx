import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import "./index.less";
import "./index.css";

// const navigate = useNavigate();
// navigate('xxxx')

function Tabs() {
  return (
    <footer>
      <NavLink to="/">
        <HomeOutlined />
        首页
      </NavLink>
      <NavLink to="/cart">
        <ShoppingCartOutlined />
        购物车
      </NavLink>
      <NavLink to="/profile">
        <UserAddOutlined />
        个人中心
      </NavLink>
    </footer>
  );
}

export default Tabs;
