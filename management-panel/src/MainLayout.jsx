import React from "react";
import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LaptopOutlined,
  DashboardOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const { Sider, Header, Content } = Layout;
const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: "/",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      path: "/",
      onClick: () => {
        navigate("/");
      },
    },
    {
      key: "/products",
      icon: <AppstoreOutlined />,
      label: "Ürünler",
      path: "/products",
      onClick: () => {
        navigate("/products");
      },
    },
    {
      key: "/user",
      icon: <LaptopOutlined />,
      label: "Kullanıcılar",
      path: "/user",
      onClick: () => {
        navigate("/user");
      },
    },
  ];
  return (
    <div className="admin-layout">
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider width={100} theme="dark">
          <Menu
            mode="vertical"
            style={{
              height: "100%",
              position: "fixed",
              width: "200px",
            }}
            items={menuItems}
            selectedKeys={[location.pathname]}
          />
        </Sider>
        <Layout>
          <Header>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "white",
                marginLeft: "90px",
              }}
            >
              <h2>Management Panel</h2>
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              padding: "24px 115px",
              minHeight: 360,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default MainLayout;
