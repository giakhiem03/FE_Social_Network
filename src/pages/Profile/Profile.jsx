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
    HeartOutlined,
    CommentOutlined,
    ShareAltOutlined,
    PictureOutlined,
    VideoCameraOutlined,
    FileTextOutlined,
} from "@ant-design/icons";
import "./Profile.scss";
import { useContext, useEffect } from "react";
import CollapsedContext from "../../constants/CollapsedContext/CollapsedContext";
import PostService from "../../service/PostService";
import { useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import Comment from "../../components/Home/Post/Comment/Comment";
import LikeButton from "../../components/Button/LikeButton/LikeButton";

function Profile() {
    const { Title, Text, Paragraph } = Typography;

    const account = useSelector((state) => state.user);
    const [postList, setPostList] = useState([]);
    const [activeComment, setActiveComment] = useState(null);
    const handleToggleComment = (postId) => {
        setActiveComment(activeComment === postId ? null : postId);
    };

    const fetchPostsForProfile = async () => {
        let res = await PostService.getAllPostsForProfile(account.id);
        console.log("res", res);
        if (res && res.data && res.errCode === 0) {
            setPostList(res.data);
        } else {
            toast.error(res.message);
        }
    };
    useEffect(() => {
        fetchPostsForProfile();
    }, []);

    const collapsed = useContext(CollapsedContext);
    return (
        <div
            className="profile-container"
            style={collapsed ? { width: 900 } : { width: 700 }}
        >
            {/* Cover Photo & Profile Section */}
            <div className="cover-photo">
                <Image
                    src={
                        account.background
                            ? `http://localhost:3001${account.background}`
                            : `http://localhost:3001${account.avatar}`
                    }
                    alt="Cover"
                    className="cover-image"
                    preview={true}
                    width="100%"
                    height="100%"
                />
                <div className="profile-header">
                    <Avatar
                        size={180}
                        src={
                            account.avatar
                                ? `http://localhost:3001${account.avatar}`
                                : `http://localhost:3001/images/default-avatar.png`
                        }
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
                <Title style={{ paddingTop: 20 }} level={2}>
                    John Doe
                </Title>
                <Text style={{ display: "block" }} type="secondary">
                    {/* {account.bio} */}Bio
                </Text>
                {/* <Paragraph className="profile-bio">
                    📍 San Francisco, CA
                    <br />
                    🎓 Computer Science @ Stanford
                    <br />
                    💼 Senior Developer @ Tech Corp
                </Paragraph> */}
                <Space className="profile-stats">
                    <Text strong>2.5k Friends</Text>
                    <Divider type="vertical" />
                    <Text strong>1.2k Following</Text>
                    <Divider type="vertical" />
                    <Text strong>{postList.length} Posts</Text>
                </Space>
            </div>

            {/* Main Content */}
            <div className="profile-content">
                <Tabs
                    defaultActiveKey="postList"
                    items={[
                        {
                            key: "postList",
                            label: (
                                <span>
                                    <FileTextOutlined /> Posts
                                </span>
                            ),
                            children: (
                                <List
                                    itemLayout="vertical"
                                    dataSource={postList}
                                    renderItem={(post) => (
                                        <Card
                                            className="post-card"
                                            key={post.id}
                                        >
                                            <div className="post-header">
                                                <Space>
                                                    <Avatar
                                                        src={`http://localhost:3001${account.avatar}`}
                                                    />
                                                    <div>
                                                        <Text strong>
                                                            {account.fullName}
                                                        </Text>
                                                        <br />
                                                        <Text type="secondary">
                                                            {post.date}
                                                        </Text>
                                                    </div>
                                                </Space>
                                            </div>
                                            <Paragraph className="post-content">
                                                {post.description}
                                            </Paragraph>
                                            {post.image && (
                                                <Image
                                                    src={`http://localhost:3001${post.image}`}
                                                    alt="Post"
                                                    className="post-image"
                                                />
                                            )}
                                            <div className="post-actions">
                                                <LikeButton
                                                    postId={post.id}
                                                    initialLikes={
                                                        post?.reaction?.length
                                                    }
                                                    isLiked={() => {
                                                        return post?.reaction?.includes(
                                                            account.id
                                                        );
                                                    }}
                                                />
                                                <Button
                                                    type="text"
                                                    icon={<CommentOutlined />}
                                                    onClick={() =>
                                                        handleToggleComment(
                                                            post.id
                                                        )
                                                    }
                                                ></Button>
                                                {/* <Button
                                                    type="text"
                                                    icon={<ShareAltOutlined />}
                                                >
                                                    {post.shares}
                                                </Button> */}
                                            </div>

                                            <Divider />
                                            {activeComment === post.id && (
                                                <Comment postId={post.id} />
                                            )}
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
