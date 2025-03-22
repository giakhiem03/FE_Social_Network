import { Layout } from "antd";
import avatar from "../../assets/image/bg.jpg";
import { Input } from "antd";
import "./MainLayout.scss";
import ListFriend from "../List/ListFriend";
import MenuLeftHome from "../Menu-Left-Home/MenuLeftHome";
import { Outlet } from "react-router";
import { useState } from "react";

const { Header, Content, Sider } = Layout;

const MainLayout = () => {
    const arr = [
        {
            fullname: "Huỳnh Gia Khiêm",
            image: avatar,
        },
        { fullname: "Lê Quang Hiến", image: avatar },
    ];

    const { Search } = Input;
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header
                theme="dark"
                className="d-flex align-items-center justify-content-between"
                style={{
                    padding: "10px",
                    position: "fixed",
                    minWidth: "100%",
                    zIndex: "100",
                }}
            >
                <div
                    className="logo"
                    style={{
                        color: "blue",
                        padding: 16,
                        fontSize: 24,
                        fontWeight: "bold",
                    }}
                >
                    Social Network
                </div>
                <div className="search">
                    <Search
                        placeholder="Search..."
                        onSearch={(value) => console.log(value)}
                        size="medium"
                        style={{
                            borderRadius: "4px",
                            display: "flex",
                            alignItems: "center",
                        }}
                    />
                </div>
                <div
                    className="profile"
                    style={{
                        color: "#fff",
                        padding: 16,
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <img
                        src={avatar}
                        alt="Avatar"
                        style={{
                            borderRadius: "50%",
                            marginRight: "8px",
                            width: "40px",
                            height: "40px",
                        }}
                    />
                    <span style={{ fontSize: 18 }}>Ben Goro</span>
                </div>
            </Header>

            <Layout style={{ paddingTop: "64px", background: "#1c1c1d" }}>
                <Sider
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                    width={300}
                    theme="dark"
                    className="side-home-left"
                    collapsible
                >
                    <MenuLeftHome />
                </Sider>
                <Content
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        // margin: `0 384px 0 ${collapsed ? "214px" : "384px"}`,
                        margin: "0 auto",
                        padding: "16px 0",
                        overflow: "auto",
                        maxWidth: "650px",
                        borderRadius: "6px",
                        transition: "padding-left 0.3s",
                    }}
                >
                    <Outlet />
                </Content>
                <Sider width={300} theme="dark" className="side-home-right">
                    <div className="community-chats">
                        <div className="title">Community chats</div>
                        <ListFriend ListFriend={arr} />
                    </div>
                </Sider>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
