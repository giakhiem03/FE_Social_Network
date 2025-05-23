import { Layout } from "antd";
import { Input } from "antd";
import "./MainLayout.scss";
import ListFriend from "../List/ListFriend";
import MenuLeftHome from "../Menu-Left-Home/MenuLeftHome";
import { Outlet, useNavigate } from "react-router";
import { useEffect, useState, useRef } from "react";
import CollapsedContext from "../../constants/CollapsedContext/CollapsedContext";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks";
import UserService from "../../service/UserService";
import { SearchOutlined, PlusCircleFilled } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { logout } from "../../store/redux/actions/userActions";
import { Dropdown } from "antd";
import { toast } from "react-toastify";

const { Header, Content, Sider } = Layout;

const MainLayout = () => {
    const account = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const searchRef = useRef(null);

    const [collapsed, setCollapsed] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const debounce = useDebounce(searchValue, 400);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                setShowResults(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        searchUsersByFullname();
    }, [debounce]);

    const searchUsersByFullname = async () => {
        if (!debounce.trim()) {
            setSearchResult([]);
            return;
        }

        const list_search = await UserService.searchUsersByFullname(
            searchValue
        );
        setSearchResult(list_search.data);
    };

    const handleOnChangeSearch = (e) => {
        setSearchValue(e.target.value);
        setShowResults(true);
    };

    const handleLogout = async () => {
        let res = await UserService.logout();
        if (res && res.errCode === 0) {
            dispatch(logout());
            navigate("/login-auth");
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    };

    const handleAddFriend = async (id) => {
        let res = await UserService.addNewFriend(account.id, id);
        if (res && res.errCode === 0) {
            toast.success(res.message);
        } else {
            toast.info(res.message);
        }
    };

    const handleShowProfile = (id) => {
        if (account.id === id) {
            navigate(`/profile`);
        } else {
            navigate(`/profile/${id}`);
        }
        setShowResults(false);
    };

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
                <div className="search-container" ref={searchRef}>
                    <div className="search-wrapper">
                        <Input
                            placeholder="Search people..."
                            onChange={handleOnChangeSearch}
                            size="large"
                            prefix={
                                <SearchOutlined style={{ color: "#65676b" }} />
                            }
                            onClick={() => {
                                if (searchResult.length > 0) {
                                    setShowResults(true);
                                }
                            }}
                            style={{
                                width: "320px",
                                borderRadius: "20px",
                                backgroundColor: "#f0f2f5",
                                border: "none",
                                boxShadow: "none",
                            }}
                        />
                    </div>
                    {showResults && searchResult.length > 0 && (
                        <div className="search-results">
                            <div className="results-list">
                                {searchResult.map((user) => (
                                    <div
                                        key={user.id}
                                        className="result-item"
                                        onClick={() =>
                                            handleShowProfile(user.id)
                                        }
                                    >
                                        <div className="user-avatar">
                                            <img
                                                src={`http://localhost:3001${user.avatar}`}
                                                alt={user.fullName}
                                            />
                                        </div>
                                        <div className="user-info">
                                            <div className="user-name">
                                                {user.fullName}
                                            </div>
                                            {user.id === account.id ? (
                                                <div className="user-status">
                                                    Bạn
                                                </div>
                                            ) : user.friends.includes(
                                                  account.id
                                              ) ? (
                                                <div className="user-status">
                                                    Bạn bè
                                                </div>
                                            ) : (
                                                <div className="user-status">
                                                    Người lạ
                                                </div>
                                            )}
                                        </div>

                                        {/* Nút thêm bạn nếu chưa là bạn */}
                                        {user.id !== account.id &&
                                            !user.friends.includes(
                                                account.id
                                            ) && (
                                                <button
                                                    className="add-friend-btn"
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Ngăn navigate khi nhấn nút
                                                        handleAddFriend(
                                                            user.id
                                                        ); // Gọi hàm thêm bạn
                                                    }}
                                                >
                                                    <PlusCircleFilled />
                                                </button>
                                            )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="profile">
                    <Dropdown
                        menu={{
                            items: [
                                {
                                    key: "profile",
                                    label: "Profile",
                                    onClick: () => navigate(`/profile`),
                                },
                                {
                                    key: "logout",
                                    label: "Logout",
                                    onClick: handleLogout,
                                },
                            ],
                        }}
                        trigger={["hover"]}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                            }}
                        >
                            <img
                                src={`http://localhost:3001${account.avatar}`}
                                alt="Avatar"
                                style={{
                                    borderRadius: "50%",
                                    marginRight: "8px",
                                    width: "40px",
                                    height: "40px",
                                }}
                            />
                            <span style={{ fontSize: 18 }}>
                                {account.fullName}
                            </span>
                        </div>
                    </Dropdown>
                </div>
            </Header>

            <Layout style={{ paddingTop: "64px", background: "#f7d6d6" }}>
                <Sider
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                    width={300}
                    theme="dark"
                    className="side-home-left"
                    collapsible
                    style={{ zIndex: 100 }}
                >
                    <MenuLeftHome />
                </Sider>
                <CollapsedContext.Provider value={collapsed}>
                    <Content
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "0 auto",
                            padding: "16px 0",
                            overflow: "auto",
                            maxWidth: "900px",
                            borderRadius: "6px",
                            transition: "padding-left 0.3s",
                        }}
                    >
                        <Outlet />
                    </Content>
                </CollapsedContext.Provider>
                <Sider width={300} theme="dark" className="side-home-right">
                    <div className="community-chats">
                        <div className="title">Community chats</div>
                        <ListFriend />
                    </div>
                </Sider>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
