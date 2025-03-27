import { Card, Avatar, Button, Divider, Tooltip } from "antd";
import {
    UserOutlined,
    LikeOutlined,
    CommentOutlined,
    ShareAltOutlined,
} from "@ant-design/icons";
import "./Post.scss";
import Comment from "./Comment/Comment.jsx";
import { useEffect, useState } from "react";
import PostService from "../../../service/PostService.js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import moment from "moment";
import LikeButton from "../../Button/LikeButton/LikeButton.jsx";

function Post() {
    const user = useSelector((state) => state.user);
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        let res = await PostService.getAllPosts(user.username);
        console.log("data", res);
        if (res && res.data && res.errCode === 0) {
            setPostList(res.data);
        } else {
            toast.error(res.message);
        }
    };

    const [activeComment, setActiveComment] = useState(null);

    const handleToggleComment = (postId) => {
        setActiveComment(activeComment === postId ? null : postId);
    };

    return (
        <>
            {postList && postList.length > 0 ? (
                postList.map((post) => (
                    <Card key={post.id} style={{ marginBottom: 16 }}>
                        <Card.Meta
                            avatar={user?.avatar}
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
                            <p>{post.caption}</p>
                            {post.image && (
                                <div
                                    style={{
                                        borderRadius: 8,
                                        overflow: "hidden",
                                        width: "100%",
                                        backgroundColor: "#f2f2f2", // tùy chọn nếu ảnh không phủ hết khung
                                        textAlign: "center", // để căn giữa ảnh
                                    }}
                                >
                                    <img
                                        src={post.image}
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
        </>
    );
}

export default Post;
