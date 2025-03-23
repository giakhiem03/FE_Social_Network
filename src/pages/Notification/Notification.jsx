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

function Notification() {
    const { Text } = Typography;
    const collapsed = useContext(CollapsedContext);

    // Mock data - replace with actual API data later
    const notifications = [
        {
            id: 1,
            type: "follow",
            user: {
                name: "John Smith",
                avatar: "https://source.unsplash.com/random/100x100?portrait=1",
            },
            content: "started following you",
            time: "2 hours ago",
            unread: true,
        },
        {
            id: 2,
            type: "like",
            user: {
                name: "Sarah Wilson",
                avatar: "https://source.unsplash.com/random/100x100?portrait=2",
            },
            content: "liked your post",
            postPreview: "Just another day at the office! 💻",
            time: "5 hours ago",
            unread: true,
        },
        {
            id: 3,
            type: "comment",
            user: {
                name: "Mike Johnson",
                avatar: "https://source.unsplash.com/random/100x100?portrait=3",
            },
            content: "commented on your post",
            comment: "Great work! Keep it up! 👍",
            time: "1 day ago",
            unread: false,
        },
    ];

    const getNotificationIcon = (type) => {
        switch (type) {
            case "follow":
                return <UserAddOutlined style={{ color: "#1890ff" }} />;
            case "like":
                return <HeartOutlined style={{ color: "#ff4d4f" }} />;
            case "comment":
                return <CommentOutlined style={{ color: "#52c41a" }} />;
            default:
                return <BellOutlined />;
        }
    };

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
                                            src={item.user.avatar}
                                            size="large"
                                        />
                                    </Badge>
                                }
                                title={
                                    <div className="notification-header">
                                        <span className="notification-icon">
                                            {getNotificationIcon(item.type)}
                                        </span>
                                        <Text strong>{item.user.name}</Text>
                                        <Text> {item.content}</Text>
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
