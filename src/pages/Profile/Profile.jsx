import {
    Avatar,
    Card,
    Row,
    Col,
    Typography,
    Tabs,
    Button,
    Image,
    Divider,
    List,
    Space,
} from "antd";
import {
    EditOutlined,
    SettingOutlined,
    UserAddOutlined,
    MessageOutlined,
    HeartOutlined,
    CommentOutlined,
    ShareAltOutlined,
    PictureOutlined,
    VideoCameraOutlined,
    FileTextOutlined,
} from "@ant-design/icons";
import "./Profile.scss";
import { useContext } from "react";
import CollapsedContext from "../../constants/CollapsedContext/CollapsedContext";

function Profile() {
    const { Title, Text, Paragraph } = Typography;

    // Mock data for posts
    const posts = [
        {
            id: 1,
            content: "Just another day at the office! 💻 #coding #developer",
            image: "https://source.unsplash.com/random/800x600?coding",
            likes: 124,
            comments: 8,
            shares: 3,
            date: "2h ago",
        },
        {
            id: 2,
            content: "Beautiful sunset view from my window 🌅",
            image: "https://source.unsplash.com/random/800x600?sunset",
            likes: 231,
            comments: 14,
            shares: 5,
            date: "5h ago",
        },
        // Add more posts as needed
    ];
    const collapsed = useContext(CollapsedContext);
    return (
        <div
            className="profile-container"
            style={collapsed ? { width: 900 } : { width: 700 }}
        >
            {/* Cover Photo & Profile Section */}
            <div className="cover-photo">
                <Image
                    src="https://th.bing.com/th/id/OIP.bINRrgMKVRCN5lD913an4QHaNK?rs=1&pid=ImgDetMain"
                    alt="Cover"
                    className="cover-image"
                    preview={true}
                    width="100%"
                    height="100%"
                />
                <div className="profile-header">
                    <Avatar
                        size={180}
                        src="https://th.bing.com/th/id/OIP.bINRrgMKVRCN5lD913an4QHaNK?rs=1&pid=ImgDetMain"
                        className="profile-avatar"
                        style={{ objectFit: "contain" }}
                        width="100%"
                        height="100%"
                    />
                    <div className="profile-actions">
                        <Button type="primary" icon={<EditOutlined />}>
                            Edit Profile
                        </Button>
                        <Button icon={<SettingOutlined />}>Settings</Button>
                    </div>
                </div>
            </div>

            {/* Profile Info */}
            <div className="profile-info">
                <Title level={2}>John Doe</Title>
                <Text type="secondary">
                    Software Developer | Photography Enthusiast
                </Text>
                <Paragraph className="profile-bio">
                    📍 San Francisco, CA
                    <br />
                    🎓 Computer Science @ Stanford
                    <br />
                    💼 Senior Developer @ Tech Corp
                </Paragraph>
                <Space className="profile-stats">
                    <Text strong>2.5k Followers</Text>
                    <Divider type="vertical" />
                    <Text strong>1.2k Following</Text>
                    <Divider type="vertical" />
                    <Text strong>156 Posts</Text>
                </Space>
            </div>

            {/* Main Content */}
            <div className="profile-content">
                <Tabs
                    defaultActiveKey="posts"
                    items={[
                        {
                            key: "posts",
                            label: (
                                <span>
                                    <FileTextOutlined /> Posts
                                </span>
                            ),
                            children: (
                                <List
                                    itemLayout="vertical"
                                    dataSource={posts}
                                    renderItem={(post) => (
                                        <Card
                                            className="post-card"
                                            key={post.id}
                                        >
                                            <div className="post-header">
                                                <Space>
                                                    <Avatar src="https://th.bing.com/th/id/OIP.bINRrgMKVRCN5lD913an4QHaNK?rs=1&pid=ImgDetMain" />
                                                    <div>
                                                        <Text strong>
                                                            John Doe
                                                        </Text>
                                                        <br />
                                                        <Text type="secondary">
                                                            {post.date}
                                                        </Text>
                                                    </div>
                                                </Space>
                                            </div>
                                            <Paragraph className="post-content">
                                                {post.content}
                                            </Paragraph>
                                            <Image
                                                src={post.image}
                                                alt="Post"
                                                className="post-image"
                                            />
                                            <div className="post-actions">
                                                <Button
                                                    type="text"
                                                    icon={<HeartOutlined />}
                                                >
                                                    {post.likes}
                                                </Button>
                                                <Button
                                                    type="text"
                                                    icon={<CommentOutlined />}
                                                >
                                                    {post.comments}
                                                </Button>
                                                <Button
                                                    type="text"
                                                    icon={<ShareAltOutlined />}
                                                >
                                                    {post.shares}
                                                </Button>
                                            </div>
                                        </Card>
                                    )}
                                />
                            ),
                        },
                        {
                            key: "photos",
                            label: (
                                <span>
                                    <PictureOutlined /> Photos
                                </span>
                            ),
                            children: (
                                <Row gutter={[16, 16]}>
                                    {Array.from({ length: 9 }, (_, i) => (
                                        <Col xs={12} sm={8} md={8} key={i}>
                                            <Image
                                                src={`https://source.unsplash.com/random/300x300?nature&sig=${i}`}
                                                alt={`Gallery image ${i}`}
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            ),
                        },
                        {
                            key: "videos",
                            label: (
                                <span>
                                    <VideoCameraOutlined /> Videos
                                </span>
                            ),
                            children: "Videos content",
                        },
                    ]}
                />
            </div>
        </div>
    );
}

export default Profile;
