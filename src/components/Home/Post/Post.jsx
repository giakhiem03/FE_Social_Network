import { Card, Avatar, Button, Divider, Tooltip, Modal } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import "./Post.scss";
import Comment from "./Comment/Comment.jsx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import LikeButton from "../../Button/LikeButton/LikeButton.jsx";

function Post({ postList, fetchPosts }) {
    const user = useSelector((state) => state.user);

    const [activeComment, setActiveComment] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

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

    return (
        <>
            {postList && postList.length > 0 ? (
                postList.map((post) => (
                    <Card key={post.id} style={{ marginBottom: 16 }}>
                        <Card.Meta
                            avatar={
                                <Avatar
                                    src={
                                        user?.avatar
                                            ? `http://localhost:3001${user.avatar}`
                                            : "/default-avatar.png"
                                    }
                                />
                            }
                            title={user?.fullName}
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
                        <div style={{ marginTop: 16 }}>
                            <p>{post.description}</p>
                            {post.image && (
                                <div
                                    style={{
                                        borderRadius: 8,
                                        overflow: "hidden",
                                        width: "100%", // decreased from 100% to 70%
                                        backgroundColor: "#f2f2f2", // tùy chọn nếu ảnh không phủ hết khung
                                        textAlign: "center", // để căn giữa ảnh
                                        cursor: "pointer", // indicate clickable
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
                                            objectFit: "contain", // giống backgroundSize: "contain"
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
        </>
    );
}

export default Post;
