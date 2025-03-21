import { Layout } from "antd";
import avatar from "../../assets/image/avatar.png";
import { Input } from "antd";
import "./MainLayout.scss";
import ListFriend from "../List/ListFriend";
import MenuLeftHome from "../Menu-Left-Home/MenuLeftHome";
import { Outlet } from "react-router";

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

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header
                className="d-flex align-items-center justify-content-between"
                style={{
                    background: "#fff",
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
                        size="large"
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
                            width: "30px",
                        }}
                    />
                    <span style={{ fontSize: 18 }}>Ben Goro</span>
                </div>
            </Header>

            <Layout style={{ paddingTop: "64px" }}>
                <Sider width={200} theme="light" className="side-home-left">
                    <MenuLeftHome />
                </Sider>
                <Content
                    style={{
                        padding: "0 264px 0 214px",
                        margin: "16px 0",
                        overflow: "auto",
                        maxWidth: "100%",
                        borderRadius: "6px",
                    }}
                >
                    <Outlet />
                </Content>
                <Sider width={250} theme="light" className="side-home-right">
                    <div className="community-chats">
                        <h5>Community chats</h5>
                        <ListFriend ListFriend={arr} />
                    </div>
                </Sider>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
