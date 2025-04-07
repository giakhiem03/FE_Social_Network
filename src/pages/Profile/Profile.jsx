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
    Modal,
    Form,
    Input,
    Upload,
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
    UploadOutlined,
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
import UserService from "../../service/UserService";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/redux/actions/userActions";

function Profile() {
    const { Title, Text, Paragraph } = Typography;
    const dispatch = useDispatch();
    const account = useSelector((state) => state.user);
    const [postList, setPostList] = useState([]);
    const [activeComment, setActiveComment] = useState(null);
    const collapsed = useContext(CollapsedContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [backgroundPreview, setBackgroundPreview] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [backgroundFile, setBackgroundFile] = useState(null);

    const showEditModal = () => {
        form.setFieldsValue({
            fullName: account.fullName,
            bio: account.bio,
        });
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form.validateFields().then(async (values) => {
            values.id = account.id;
            if (avatarFile) {
                values.avatar = avatarFile;
            }
            if (backgroundFile) {
                values.background = backgroundFile;
            }
            let res = await UserService.updateProfile(values);
            if (res && res.errCode === 0) {
                dispatch(setUser(res.data));
                toast.success(res.message);
                setBackgroundPreview(null);
                setBackgroundFile(null);
                setAvatarPreview(null);
                setAvatarFile(null);
                setIsModalOpen(false);
            } else {
                console.log(res.message);
            }
        });
    };

    const handleCancel = () => {
        setBackgroundPreview(null);
        setBackgroundFile(null);
        setAvatarPreview(null);
        setAvatarFile(null);
        setIsModalOpen(false);
    };
    useEffect(() => {
        fetchPostsForProfile();
    }, []);

    const handleToggleComment = (postId) => {
        setActiveComment(activeComment === postId ? null : postId);
    };

    const fetchPostsForProfile = async () => {
        let res = await PostService.getAllPostsForProfile(account.id);
        if (res && res.data && res.errCode === 0) {
            setPostList(res.data);
        } else {
            toast.error(res.message);
        }
    };

    const handleDeletePost = async (id) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            let res = await PostService.deleteById(id);
            if (res && res.errCode === 0) {
                toast.success(res.message);
                fetchPostsForProfile();
            } else {
                toast.error(res.message);
            }
        }
    };

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
                        <Button
                            type="primary"
                            icon={<EditOutlined />}
                            onClick={showEditModal}
                        >
                            Edit Profile
                        </Button>
                        <Button icon={<SettingOutlined />}>Settings</Button>
                    </div>
                </div>
            </div>

            {/* Profile Info */}
            <div className="profile-info">
                <Title style={{ paddingTop: 20 }} level={2}>
                    {account.fullName}
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
                    {/* <Text strong>2.5k Friends</Text>
                    <Divider type="vertical" />
                    <Text strong>1.2k Following</Text>
                    <Divider type="vertical" /> */}
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
                                                <Space style={{ flex: 1 }}>
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
                                                <Button
                                                    danger
                                                    type="text"
                                                    onClick={() => {
                                                        handleDeletePost(
                                                            post.id
                                                        );
                                                    }}
                                                >
                                                    Delete
                                                </Button>
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
            <Modal
                title="Edit Profile"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Save"
                cancelText="Cancel"
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="fullName"
                        label="Full Name"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your name",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Avatar">
                        <Upload
                            beforeUpload={(file) => {
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                    setAvatarPreview(e.target.result);
                                };
                                reader.readAsDataURL(file);
                                setAvatarFile(file);
                                return false; // Ngăn upload tự động
                            }}
                            showUploadList={false}
                        >
                            <Button icon={<UploadOutlined />}>
                                Upload Avatar
                            </Button>
                        </Upload>
                        {avatarPreview && avatarPreview !== account.avatar && (
                            <Image
                                src={`${avatarPreview}`}
                                alt="avatar"
                                width={100}
                                style={{ borderRadius: "50%" }}
                            />
                        )}
                    </Form.Item>

                    <Form.Item label="Background">
                        <Upload
                            beforeUpload={(file) => {
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                    setBackgroundPreview(e.target.result);
                                };
                                reader.readAsDataURL(file);
                                setBackgroundFile(file);
                                return false;
                            }}
                            showUploadList={false}
                        >
                            <Button icon={<UploadOutlined />}>
                                Upload Background
                            </Button>
                        </Upload>
                        {backgroundPreview &&
                            backgroundPreview !== account.background && (
                                <Image
                                    src={`${backgroundPreview}`}
                                    alt="background"
                                    width="100%"
                                    height={150}
                                    style={{ objectFit: "cover" }}
                                />
                            )}
                    </Form.Item>

                    <Form.Item name="bio" label="Bio">
                        <Input.TextArea rows={3} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default Profile;
