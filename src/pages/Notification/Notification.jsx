import { List, Avatar, Typography, Badge, Tabs, Button, Tooltip } from "antd";
import {
    UserAddOutlined,
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
import moment from "moment";

function Notification() {
    const { Text } = Typography;
    const collapsed = useContext(CollapsedContext);
    const [notifications, setNotifications] = useState([]);
    const account = useSelector((state) => state.user);

    const fetchNotifications = async () => {
        let res = await UserService.getNotifications(account?.id);
        if (res && res.data && res.errCode === 0) {
            setNotifications(res.data);
        } else {
            toast.error(res.message);
        }
    };
    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleAcceptRequest = async (id) => {
        let res = await UserService.acceptRequestAddFriend(account?.id, id);
        if (res && res.errCode === 0) {
            toast.success(res.message);
            fetchNotifications();
        } else {
            toast.error(res.message);
        }
    };

    const rejectRequestAddFriend = async (id) => {
        let res = await UserService.rejectRequestAddFriend(account?.id, id);
        if (res && res.errCode === 0) {
            toast.success(res.message);
            fetchNotifications();
        } else {
            toast.error(res.message);
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
                            className="notification-item"
                            actions={[
                                <Button
                                    type="text"
                                    size="small"
                                    style={{ backgroundColor: "#b2ffb2" }}
                                    onClick={() =>
                                        handleAcceptRequest(item.user_1.id)
                                    }
                                >
                                    Accept
                                </Button>,
                                <Button
                                    type="text"
                                    size="small"
                                    style={{ backgroundColor: "#ee5959" }}
                                    onClick={() =>
                                        rejectRequestAddFriend(item.user_1.id)
                                    }
                                >
                                    Reject
                                </Button>,
                            ]}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Badge dot={item?.unread}>
                                        <Avatar
                                            src={`http://localhost:3001/${item?.user_1?.avatar}`}
                                            size="large"
                                        />
                                    </Badge>
                                }
                                title={
                                    <div className="notification">
                                        <span className="notification">
                                            {item?.user_1?.fullName}
                                        </span>
                                        <Text
                                            strong
                                            style={{ marginLeft: "6px" }}
                                        >
                                            đã gửi cho bạn lời mời kết bạn
                                        </Text>
                                    </div>
                                }
                                description={
                                    <div className="notification-content">
                                        {item.comment && (
                                            <Text className="notification-preview">
                                                {item?.user_1?.comment}
                                            </Text>
                                        )}
                                        <Tooltip
                                            title={moment(
                                                item?.user_1?.createdAt
                                            ).format("YYYY-MM-DD HH:mm:ss")}
                                        >
                                            <span
                                                style={{
                                                    fontSize: 12,
                                                    color: "#999",
                                                }}
                                            >
                                                {moment(
                                                    item?.user_1?.createdAt
                                                ).fromNow()}
                                            </span>
                                        </Tooltip>
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
