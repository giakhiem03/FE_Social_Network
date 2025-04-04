import React, { useState } from "react";
import { Avatar, Button, Input, List, Tooltip, Card, Modal } from "antd";
import {
    UserOutlined,
    SendOutlined,
    PictureOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useSelector } from "react-redux";
import "./Comment.scss";

const { TextArea } = Input;

function CommentComponent({ postId, comments = [], onAddComment }) {
    const [commentText, setCommentText] = useState("");
    const [image, setImage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewImageCmt, setPreviewImageCmt] = useState("");
    const user = useSelector((state) => state.user);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmitComment();
        }
    };

    const handleSubmitComment = () => {
        if (!commentText.trim() && image === false) return;
        setSubmitting(true);
        // Create new comment object matching your data structure
        const newComment = {
            post_id: postId,
            user_id: user.id,
            image: image,
            content: commentText,
        };

        // Call the passed onAddComment function (which would make the API call)
        if (onAddComment) {
            onAddComment(newComment);
        }

        setCommentText("");
        setSubmitting(false);
        setPreviewImage("");
        setImage("");
    };

    const [previewVisibleCmt, setPreviewVisibleCmt] = useState(false);
    const [previewVisibleChat, setPreviewVisibleChat] = useState(false);
    const handlePreview = (image, type) => {
        // let previewImg = URL.createObjectURL(image);

        if (type === "cmt") {
            setPreviewImageCmt(image);
            setPreviewVisibleCmt(true);
        }

        if (type === "chat") {
            setPreviewImage(image);
            setPreviewVisibleChat(true);
        }
    };

    const handleCancelPreview = (type) => {
        if (type === "cmt") {
            setPreviewImageCmt("");
            setPreviewVisibleCmt(false);
        }
        if (type === "chat") {
            setPreviewVisibleChat(false);
        }
    };

    const handleOnchangeImage = async (e) => {
        let file = e.target.files[0];
        if (file) {
            let previewImg = URL.createObjectURL(file);
            setPreviewImage(previewImg);
            setImage(file);
        }
    };
    return (
        <Card
            className="comment-section"
            style={{
                boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                borderRadius: 8,
                padding: 16,
            }}
        >
            <div
                className="comment-input"
                style={{
                    display: "flex",
                    marginBottom: 16,
                    alignItems: "center",
                }}
            >
                <Avatar
                    src={
                        user.avatar
                            ? `http://localhost:3001/${user.avatar}`
                            : `http://localhost:3001/default-avatar.png`
                    }
                    icon={!user.avatar && <UserOutlined />}
                    style={{ marginRight: 12 }}
                />
                <div style={{ flex: 1, position: "relative" }}>
                    <TextArea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Write a comment..."
                        autoSize={{ minRows: 1, maxRows: 4 }}
                        style={{
                            paddingRight: 40,
                            borderRadius: 8,
                            borderColor: "#d9d9d9",
                        }}
                    />
                    <Button
                        type="text"
                        icon={<SendOutlined />}
                        loading={submitting}
                        onClick={handleSubmitComment}
                        disabled={!commentText.trim() && !image}
                        style={{
                            position: "absolute",
                            right: 5,
                            color: commentText.trim() ? "#1890ff" : "#bfbfbf",
                        }}
                    />
                    {previewImage && (
                        <div
                            className="preview-image"
                            style={{
                                position: "relative",
                                backgroundImage: `url(${previewImage})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                width: 100,
                                height: 100,
                                borderRadius: 8,
                                marginTop: 8,
                            }}
                            onClick={() => handlePreview(previewImage, "chat")}
                        >
                            <Button
                                type="text"
                                icon={
                                    <DeleteOutlined
                                        style={{
                                            color: "red",
                                            fontSize: "14px",
                                        }}
                                    />
                                }
                                onClick={(e) => {
                                    e.stopPropagation();
                                    return setPreviewImage("");
                                }}
                                style={{
                                    position: "absolute",
                                    top: -10,
                                    right: -10,
                                    background: "#fff",
                                    borderRadius: "50%",
                                    boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                                }}
                            />
                        </div>
                    )}
                </div>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={handleOnchangeImage}
                />
                <Button
                    type="default"
                    icon={<PictureOutlined />}
                    onClick={() => document.getElementById("fileInput").click()}
                    style={{ marginLeft: 12 }}
                />
            </div>

            {/* Comments list */}
            <List
                className="comment-list"
                itemLayout="horizontal"
                dataSource={comments.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                )}
                renderItem={(comment) => (
                    <List.Item
                        style={{
                            padding: "8px 0",
                            border: "none",
                            borderBottom: "1px solid #f0f0f0",
                        }}
                    >
                        <List.Item.Meta
                            avatar={
                                comment?.user?.avatar && (
                                    <Avatar
                                        src={`http://localhost:3001/${comment?.user?.avatar}`}
                                        icon={
                                            !comment?.user?.avatar && (
                                                <UserOutlined />
                                            )
                                        }
                                    />
                                )
                            }
                            title={
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <span style={{ fontWeight: "bold" }}>
                                        {comment?.user?.fullName}
                                    </span>
                                    <Tooltip
                                        title={moment(comment.createdAt).format(
                                            "YYYY-MM-DD HH:mm:ss"
                                        )}
                                    >
                                        <span
                                            style={{
                                                fontSize: 12,
                                                color: "#999",
                                            }}
                                        >
                                            {moment(
                                                comment.createdAt
                                            ).fromNow()}
                                        </span>
                                    </Tooltip>
                                </div>
                            }
                            description={
                                <div style={{ color: "#4e4e4e" }}>
                                    {comment.content}
                                    {comment?.image && (
                                        <div style={{ marginTop: 8 }}>
                                            <img
                                                src={`http://localhost:3001/${comment?.image}`}
                                                alt=""
                                                style={{
                                                    maxWidth: 200,
                                                    maxHeight: 150,
                                                    borderRadius: 4,
                                                    boxShadow:
                                                        "0 1px 3px rgba(0,0,0,0.12)",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() =>
                                                    handlePreview(
                                                        `http://localhost:3001/${comment?.image}`,
                                                        "cmt"
                                                    )
                                                }
                                            />
                                        </div>
                                    )}
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
            <Modal
                open={previewVisibleCmt}
                footer={null}
                onCancel={() => handleCancelPreview("cmt")}
            >
                <img
                    alt="Preview"
                    style={{ width: "100%", maxHeight: "80vh" }}
                    src={previewImageCmt}
                />
            </Modal>

            <Modal
                open={previewVisibleChat}
                footer={null}
                onCancel={() => handleCancelPreview("chat")}
            >
                <img
                    alt="Preview"
                    style={{ width: "100%", maxHeight: "80vh" }}
                    src={previewImage}
                />
            </Modal>
        </Card>
    );
}

export default CommentComponent;
