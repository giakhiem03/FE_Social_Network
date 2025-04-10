import {
    Card,
    Avatar,
    Button,
    Divider,
    Tooltip,
    Modal,
    Dropdown,
    Menu,
    Upload,
} from "antd";
import {
    CommentOutlined,
    DeleteOutlined,
    EditOutlined,
    EllipsisOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import "./Post.scss";
import Comment from "./Comment/Comment.jsx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import LikeButton from "../../Button/LikeButton/LikeButton.jsx";
import PostService from "../../../service/PostService.js";
import { toast } from "react-toastify";

function Post({ postList, fetchPosts }) {
    const user = useSelector((state) => state.user);

    const [activeComment, setActiveComment] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [editDescription, setEditDescription] = useState("");
    const [editImage, setEditImage] = useState(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleToggleComment = (postId) => {
        setActiveComment(activeComment === postId ? null : postId);
    };

    const handleImageClick = (imageSrc) => {
        setPreviewImage(imageSrc);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    const handleDeletePost = async (id) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            let res = await PostService.deleteById(id);
            if (res && res.errCode === 0) {
                toast.success(res.message);
                fetchPosts();
            } else {
                toast.error(res.message);
            }
        }
    };

    const menuItems = [
        {
            key: "update",
            label: "Edit",
            icon: <EditOutlined />,
        },
        {
            key: "delete",
            label: "Delete",
            icon: <DeleteOutlined />,
            danger: true,
        },
    ];

    const handleUpdateClick = (post) => {
        setEditingPost(post);
        setEditDescription(post.description || "");
        setEditImage(null); // reset file nếu có trước đó
    };

    const handleUpdateSubmit = async () => {
        if (!editingPost) return;
        const res = await PostService.updatePost(
            editingPost.id,
            editDescription,
            editImage
        );
        if (res && res.errCode === 0) {
            toast.success(res.message);
            fetchPosts();
            setEditingPost(null);
        } else {
            toast.error(res.message || "Update failed");
        }
    };

    return (
        <>
            {postList && postList.length > 0 ? (
                postList.map((post) => (
                    <Card key={post.id} style={{ marginBottom: 16 }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                            }}
                        >
                            <Card.Meta
                                avatar={
                                    <Avatar
                                        src={`http://localhost:3001${post?.userPost?.avatar}`}
                                    />
                                }
                                title={post?.userPost?.fullName}
                                description={
                                    <Tooltip
                                        title={moment(post.createdAt).format(
                                            "YYYY-MM-DD HH:mm:ss"
                                        )}
                                    >
                                        <span
                                            style={{
                                                fontSize: 12,
                                                color: "#999",
                                            }}
                                        >
                                            {moment(post.createdAt).fromNow()}
                                        </span>
                                    </Tooltip>
                                }
                                className="wrap-post"
                            />
                            {post.post_by === user.id && (
                                <Dropdown
                                    menu={{
                                        items: menuItems,
                                        onClick: ({ key }) => {
                                            if (key === "update")
                                                handleUpdateClick(post);
                                            if (key === "delete")
                                                handleDeletePost(post.id);
                                        },
                                    }}
                                    trigger={["click"]}
                                >
                                    <Button
                                        type="text"
                                        icon={
                                            <EllipsisOutlined
                                                style={{ fontSize: 20 }}
                                            />
                                        }
                                    />
                                </Dropdown>
                            )}
                        </div>
                        <div style={{ marginTop: 16 }}>
                            <p>{post.description}</p>
                            {post.image && (
                                <div
                                    style={{
                                        borderRadius: 8,
                                        overflow: "hidden",
                                        width: "100%",
                                        backgroundColor: "#f2f2f2", // tùy chọn nếu ảnh không phủ hết khung
                                        textAlign: "center",
                                        cursor: "pointer",
                                    }}
                                    onClick={() =>
                                        handleImageClick(
                                            `http://localhost:3001${post.image}`
                                        )
                                    }
                                >
                                    <img
                                        src={`http://localhost:3001${post.image}`}
                                        alt="background"
                                        style={{
                                            width: "100%",
                                            objectFit: "contain", // backgroundSize: "contain"
                                            display: "block", // tránh khoảng trắng dưới ảnh
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                        <Divider />
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "center",
                            }}
                        >
                            <LikeButton
                                postId={post.id}
                                initialLikes={post?.reaction?.length}
                                isLiked={() => {
                                    return post?.reaction?.includes(user.id);
                                }}
                            />
                            <Button
                                icon={<CommentOutlined />}
                                onClick={() => handleToggleComment(post.id)}
                            >
                                Comment
                            </Button>
                            {/* <Button icon={<ShareAltOutlined />}>Share</Button> */}
                        </div>
                        <Divider />
                        {activeComment === post.id && (
                            <Comment postId={post.id} />
                        )}
                    </Card>
                ))
            ) : (
                <h3
                    className="d-flex align-items-center justify-content-center"
                    style={{ opacity: 0.4, userSelect: "none", height: "70%" }}
                >
                    No contents...
                </h3>
            )}

            <Modal
                open={isModalVisible}
                footer={null}
                onCancel={handleModalClose}
                width="80%"
                centered
                styles={{
                    body: { padding: 0, backgroundColor: "transparent" },
                }}
                style={{ maxWidth: "1000px" }}
            >
                <img
                    src={previewImage}
                    alt="Enlarged view"
                    style={{
                        width: "100%",
                        height: "auto",
                        maxHeight: "90vh",
                        objectFit: "contain",
                    }}
                />
            </Modal>
            <Modal
                title="Update Post"
                open={!!editingPost}
                onCancel={() => setEditingPost(null)}
                onOk={handleUpdateSubmit}
                okText="Update"
            >
                <div style={{ marginBottom: 12 }}>
                    <label>Description:</label>
                    <textarea
                        rows={4}
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        style={{ width: "100%", marginTop: 8 }}
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <Upload
                        beforeUpload={(file) => {
                            if (file.type.startsWith("video/")) {
                                toast.info("Chưa hỗ trợ file video");
                                return false;
                            }
                            setEditImage(file);
                            return false; // không upload ngay lập tức
                        }}
                        // showUploadList={
                        //     editImage ? [{ name: editImage.name }] : false
                        // }
                        fileList={editImage ? [editImage] : []}
                        onRemove={() => setEditImage(null)}
                    >
                        <Button icon={<UploadOutlined />}>Choose Image</Button>
                    </Upload>
                </div>
            </Modal>
        </>
    );
}

export default Post;
