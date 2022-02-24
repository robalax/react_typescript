import React, { FC } from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
const { Header, Content, Sider } = Layout;

const Sidebar: FC = () => {
  const navigate = useNavigate();
  const goTo = (url: string) => {
    navigate(url);
  };

  return (
    <>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
        >
          <Menu.Item key="1" onClick={() => goTo("/")}>
            Overview
          </Menu.Item>
          <Menu.Item key="2" onClick={() => goTo("/favorites")}>
            Favorites
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};

export default Sidebar;
