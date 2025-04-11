import React, { useEffect, useState } from "react";
import {
    Card,
    Avatar,
    Typography,
    Divider,
    Tag,
    Statistic,
    Row,
    Col,
    Space,
} from "antd";
import {
    UserOutlined,
    MailOutlined,
    InfoCircleOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router";
import UserService from "../../../service/UserService";

const { Title, Text, Paragraph } = Typography;

const FriendProfile = () => {
    const [userData, setUserData] = useState([]);
    const params = useParams();

    useEffect(() => {
        fetchUser();
    }, [params.id]);

    const fetchUser = async () => {
        let res = await UserService.getDetailUser(params.id);
        if (res && res.errCode === 0) {
            setUserData(res.data);
        } else {
            console.log(res.message);
        }
    };

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    // Background style
    const backgroundStyle = {
        backgroundImage: `url(http://localhost:3001${userData.background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "200px",
        borderRadius: "8px 8px 0 0",
        position: "relative",
    };

    // Avatar style (positioned at the bottom of the background)
    const avatarContainerStyle = {
        position: "absolute",
        bottom: "-40px",
        left: "24px",
        border: "4px solid #fff",
        borderRadius: "50%",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    };

    return (
        <Card
            variant={false}
            style={{
                width: "100%",
                maxWidth: "800px",
                margin: "0 auto",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            }}
            styles={{
                body: {
                    padding: 0,
                },
            }}
        >
            {/* Background Image */}
            <div style={backgroundStyle}>
                <div style={avatarContainerStyle}>
                    <Avatar
                        size={80}
                        src={`http://localhost:3001${userData.avatar}`}
                        icon={<UserOutlined />}
                    />
                </div>
            </div>

            {/* User Info Section */}
            <div style={{ padding: "48px 24px 24px" }}>
                <Row justify="space-between" align="middle">
                    <Col>
                        <Title level={3} style={{ marginBottom: "4px" }}>
                            {userData.fullName}
                        </Title>
                        <Text type="secondary">@{userData.username}</Text>
                        <Space style={{ marginLeft: "12px" }}>
                            <Tag color="blue">
                                {userData?.Role?.role_name || "User"}
                            </Tag>
                            <Tag color="green">
                                {userData?.genders?.gender || "Unknown"}
                            </Tag>
                        </Space>
                    </Col>
                    <Col>
                        <Text type="secondary">
                            Tham gia ngày {formatDate(userData?.createdAt)}
                        </Text>
                    </Col>
                </Row>

                <Paragraph
                    style={{
                        marginTop: "16px",
                        fontSize: "16px",
                    }}
                >
                    <InfoCircleOutlined style={{ marginRight: "8px" }} />
                    {userData?.bio || "Chưa có thông tin giới thiệu"}
                </Paragraph>

                <Paragraph>
                    <MailOutlined style={{ marginRight: "8px" }} />
                    <Text>{userData?.email}</Text>
                </Paragraph>

                <Divider style={{ margin: "12px 0" }} />

                <Row gutter={24}>
                    <Col span={8}>
                        <Statistic
                            title="Bạn bè"
                            value={userData?.countFriend}
                            prefix={<TeamOutlined />}
                        />
                    </Col>
                    <Col span={8}>
                        <Statistic
                            title="Cập nhật lần cuối"
                            value={formatDate(userData?.updatedAt)}
                            valueStyle={{ fontSize: "16px" }}
                        />
                    </Col>
                </Row>
            </div>
        </Card>
    );
};

export default FriendProfile;
