import React, { useState } from "react";
import { Avatar, Button, Input, List, Tooltip, Card, Modal } from "antd";
import { UserOutlined, SendOutlined, PictureOutlined } from "@ant-design/icons";
import moment from "moment";
import { useSelector } from "react-redux";
import "./Comment.scss";

const { TextArea } = Input;

function CommentComponent({ postId, comments = [], onAddComment }) {
    const [commentText, setCommentText] = useState("");
    const [image, setImage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const user = useSelector((state) => state.user);

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

    const [previewVisible, setPreviewVisible] = useState(false);
    const handlePreview = (image) => {
        let previewImg = URL.createObjectURL(image);
        setPreviewImage(previewImg);
        setPreviewVisible(true);
    };

    const handleCancelPreview = () => {
        setPreviewImage("");
        setPreviewVisible(false);
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
                        user.avatar ||
                        "https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/485059298_969209485394154_8363760988421917504_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=vNLFXfjYsE4Q7kNvgGdQZV1&_nc_oc=AdmoaCHNH6PZMla8WJtel1m8TyEKVmXCC9e7AeKuikVHUXt8ioMVwqGAlWiNjOiidMA2SRbq7erTdQLRrf2yIoTh&_nc_zt=23&_nc_ht=scontent.fsgn5-10.fna&_nc_gid=-zh-BQXkvcNHm1w7ximMDg&oh=00_AYExftgvnIkZvl1Azd2kTJXIK5B1voMes6Xkd-0x0ZUgaA&oe=67E43D75"
                    }
                    icon={!user.avatar && <UserOutlined />}
                    style={{ marginRight: 12 }}
                />
                <div style={{ flex: 1, position: "relative" }}>
                    <TextArea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
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
                            bottom: 5,
                            color: commentText.trim() ? "#1890ff" : "#bfbfbf",
                        }}
                    />
                    {previewImage && (
                        <div
                            className="preview-image"
                            style={{
                                backgroundImage: `url(${previewImage})`,
                            }}
                            // onClick={this.openPreviewImage}
                        ></div>
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
                                        src={comment?.user?.avatar}
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
                                    <span>{comment?.user?.fullName}</span>
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
                                                        comment?.image
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
                open={previewVisible}
                footer={null}
                onCancel={handleCancelPreview}
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
