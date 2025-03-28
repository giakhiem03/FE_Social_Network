import { List, Avatar, Typography, Badge, Tabs, Button } from "antd";
import {
    BellOutlined,
    UserAddOutlined,
    HeartOutlined,
    CommentOutlined,
    GlobalOutlined,
} from "@ant-design/icons";
import "./Notification.scss";
import { useContext } from "react";
import CollapsedContext from "../../constants/CollapsedContext/CollapsedContext";
import UserService from "../../service/UserService";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Notification() {
    const { Text } = Typography;
    const collapsed = useContext(CollapsedContext);
    const [notifications, setNotifications] = useState([]);
    const account = useSelector((state) => state.user);

    useEffect(() => {
        const fetchNotifications = async () => {
            let res = await UserService.getNotifications(account?.id);
            if (res && res.data && res.errCode === 0) {
                setNotifications(res.data);
            } else {
                toast.error(res.message);
            }
        };
        fetchNotifications();
    }, []);

    // const getNotificationIcon = (type) => {
    //     switch (type) {
    //         case "follow":
    //             return <UserAddOutlined style={{ color: "#1890ff" }} />;
    //         case "like":
    //             return <HeartOutlined style={{ color: "#ff4d4f" }} />;
    //         case "comment":
    //             return <CommentOutlined style={{ color: "#52c41a" }} />;
    //         default:
    //             return <BellOutlined />;
    //     }
    // };
    console.log("notifications", notifications);
    const tabItems = [
        {
            key: "all",
            label: (
                <span>
                    <GlobalOutlined /> All
                </span>
            ),
            children: (
                <List
                    className="notification-list"
                    itemLayout="horizontal"
                    dataSource={notifications}
                    renderItem={(item) => (
                        <List.Item
                            className={`notification-item ${
                                item.unread ? "unread" : ""
                            }`}
                            actions={[
                                <Button type="text" size="small">
                                    Mark as read
                                </Button>,
                            ]}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Badge dot={item.unread}>
                                        <Avatar
                                            src={`http://localhost:3001/${item?.avatar}`}
                                            size="large"
                                        />
                                    </Badge>
                                }
                                title={
                                    <div className="notification-header">
                                        <span className="notification-icon">
                                            {item?.fullName}
                                        </span>
                                        <Text strong>
                                            đã gửi cho bạn lời mời kết bạn
                                        </Text>
                                    </div>
                                }
                                description={
                                    <div className="notification-content">
                                        {item.comment && (
                                            <Text className="notification-preview">
                                                "{item.comment}"
                                            </Text>
                                        )}
                                        {item.postPreview && (
                                            <Text className="notification-preview">
                                                "{item.postPreview}"
                                            </Text>
                                        )}
                                        <Text
                                            type="secondary"
                                            className="notification-time"
                                        >
                                            {item.time}
                                        </Text>
                                    </div>
                                }
                            />
                        </List.Item>
                    )}
                />
            ),
        },
        {
            key: "mentions",
            label: (
                <span>
                    <CommentOutlined /> Mentions
                </span>
            ),
            children: "Mentions content",
        },
        {
            key: "follows",
            label: (
                <span>
                    <UserAddOutlined /> Follows
                </span>
            ),
            children: "Follows content",
        },
    ];

    return (
        <div
            className="wrap-notification"
            style={collapsed ? { width: 900 } : { width: 700 }}
        >
            <div className="notification-container">
                <div className="notification-header">
                    <Typography.Title level={4}>Notifications</Typography.Title>
                    <Button type="link">Mark all as read</Button>
                </div>
                <Tabs
                    defaultActiveKey="all"
                    items={tabItems}
                    className="notification-tabs"
                />
            </div>
        </div>
    );
}

export default Notification;
