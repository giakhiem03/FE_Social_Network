import React, { useState } from "react";
import { Avatar, Button, Input, List, Tooltip, Card } from "antd";
import { UserOutlined, SendOutlined } from "@ant-design/icons";
import moment from "moment";
import { useSelector } from "react-redux";

const { TextArea } = Input;

function CommentComponent({ postId, comments, onAddComment }) {
    const [commentText, setCommentText] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const user = useSelector((state) => state.user);
    const handleSubmitComment = () => {
        if (!commentText.trim()) return;
        setSubmitting(true);

        // Create new comment object matching your data structure
        const newComment = {
            post_id: postId,
            user_id: user.id,
            image: "",
            content: commentText,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        // Call the passed onAddComment function (which would make the API call)
        if (onAddComment) {
            onAddComment(newComment);
        }

        setCommentText("");
        setSubmitting(false);
    };

    return (
        <Card
            className="comment-section"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.12)" }}
        >
            {/* Comment input */}
            <div
                className="comment-input"
                style={{ display: "flex", marginBottom: 16 }}
            >
                <Avatar
                    src={user.avatar}
                    icon={!user.avatar && <UserOutlined />}
                    style={{ marginRight: 12 }}
                />
                <div style={{ flex: 1, position: "relative" }}>
                    <TextArea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Write a comment..."
                        autoSize={{ minRows: 1, maxRows: 4 }}
                        style={{ paddingRight: 40 }}
                    />
                    <Button
                        type="text"
                        icon={<SendOutlined />}
                        loading={submitting}
                        onClick={handleSubmitComment}
                        disabled={!commentText.trim()}
                        style={{
                            position: "absolute",
                            right: 5,
                            bottom: 5,
                            color: commentText.trim() ? "#1890ff" : "#bfbfbf",
                        }}
                    />
                </div>
            </div>

            {/* Comments list */}
            <List
                className="comment-list"
                itemLayout="horizontal"
                dataSource={comments.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                )}
                renderItem={(comment) => (
                    <List.Item style={{ padding: "8px 0", border: "none" }}>
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    src={comment.user.avatar}
                                    icon={
                                        !comment.user.avatar && <UserOutlined />
                                    }
                                />
                            }
                            title={
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <span>{comment.user.fullName}</span>
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
                                <div>
                                    {comment.content}
                                    {comment.image && (
                                        <div style={{ marginTop: 8 }}>
                                            <img
                                                src={comment.image}
                                                alt=""
                                                style={{
                                                    maxWidth: 200,
                                                    maxHeight: 150,
                                                    borderRadius: 4,
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
}

export default CommentComponent;
