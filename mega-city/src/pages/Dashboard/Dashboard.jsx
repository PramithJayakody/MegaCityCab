import React, { useState } from "react";

import { Layout, theme } from "antd";
import VerticalMenu from "../../components/VerticleMenu";
import { useNavigate } from "react-router-dom";
import Home from "../../components/DashboardContent/Home";
import CustomerManagement from "../../components/DashboardContent/CustomerManagement";
import DriverManagement from "../../components/DashboardContent/DriverManagement";
import VehicleManagement from "../../components/DashboardContent/VehicleManagement";
import CouponManagement from "../../components/DashboardContent/CouponManagement";
import BookingManagement from "../../components/DashboardContent/NotificationManagement";

const { Sider, Content } = Layout;

const Dashboard = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const navigate = useNavigate();

  const onMenuItemClicked = (index) => {
    setActiveIndex(index);
  };

  const onLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        style={{
          background: colorBgContainer,
          borderRight: "1px solid #f0f0f0",
        }}
      >
        <div
          style={{
            padding: "16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        ></div>

        <VerticalMenu
          onMenuItemClicked={onMenuItemClicked}
          onLogout={onLogout}
        />
      </Sider>

      <Layout>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {activeIndex === 1 && <Home />}
          {activeIndex === 2 && <CustomerManagement />}
          {activeIndex === 3 && <DriverManagement />}
          {activeIndex === 4 && <VehicleManagement />}
          {activeIndex === 5 && <CouponManagement />}
          {activeIndex === 6 && <BookingManagement />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
