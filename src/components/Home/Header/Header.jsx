import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import { Input, Button, Avatar, message, Tooltip, Modal } from "antd";
import {
    SmileOutlined,
    LinkOutlined,
    EnvironmentOutlined,
    CloseOutlined,
    PictureOutlined,
} from "@ant-design/icons";
import "./Header.scss";
import PostService from "../../../service/PostService";
import { toast } from "react-toastify";

function Header({ fetchPosts }) {
    const account = useSelector((state) => state.user);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handlePost = async () => {
        if (!description && !image) {
            message.warning(
                "Please add a description or an image before posting."
            );
            return;
        }

        let res = await PostService.addNewPost(account.id, image, description);
        if (res && res.errCode === 0) {
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
        setDescription("");
        setImage(null);
        setPreview(null);
        fetchPosts();
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);

            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleImageDelete = () => {
        setImage(null);
        setPreview(null);
        // Reset the file input value so the same file can be selected again
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const showImageModal = () => {
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="wrap-header-home">
            <div className="post-input">
                <Avatar
                    src={
                        account.avatar
                            ? `http://localhost:3001/${account.avatar}`
                            : "https://my.alfred.edu/zoom/_images/foster-lake.jpg"
                    }
                    size={48}
                    className="user-avatar"
                />
                <Input.TextArea
                    placeholder="What's on your mind?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    autoSize={{ minRows: 2, maxRows: 6 }}
                    className="post-textarea"
                />
            </div>
            {preview && (
                <div className="image-preview">
                    <div className="preview-container">
                        <img
                            style={{
                                height: 150,
                                width: 150,
                                cursor: "pointer",
                            }}
                            src={preview}
                            alt="Preview"
                            onClick={showImageModal}
                        />
                        <Button
                            className="delete-button"
                            shape="circle"
                            icon={<CloseOutlined />}
                            onClick={handleImageDelete}
                        />
                    </div>
                </div>
            )}
            <div className="post-actions">
                <div className="action-buttons">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                        id="image-upload"
                        ref={fileInputRef}
                    />
                    <Tooltip title="Upload Image">
                        <Button
                            icon={<PictureOutlined />}
                            className="action-icon-button"
                            onClick={() =>
                                document.getElementById("image-upload").click()
                            }
                        >
                            Photo
                        </Button>
                    </Tooltip>
                    <Tooltip title="Add Link">
                        <Button
                            icon={<LinkOutlined />}
                            className="action-icon-button"
                        >
                            Link
                        </Button>
                    </Tooltip>
                    <Tooltip title="Add Location">
                        <Button
                            icon={<EnvironmentOutlined />}
                            className="action-icon-button"
                        >
                            Location
                        </Button>
                    </Tooltip>
                    <Tooltip title="Add Emoji">
                        <Button
                            icon={<SmileOutlined />}
                            className="action-icon-button"
                        >
                            Feeling
                        </Button>
                    </Tooltip>
                </div>
                <Button
                    type="primary"
                    onClick={handlePost}
                    className="post-button"
                    size="large"
                >
                    Post
                </Button>
            </div>

            <Modal
                visible={isModalVisible}
                footer={null}
                onCancel={handleModalClose}
                width="80%"
                centered
                bodyStyle={{ padding: 0, backgroundColor: "transparent" }}
                style={{ maxWidth: "1000px" }}
            >
                <img
                    src={preview}
                    alt="Enlarged view"
                    style={{
                        width: "100%",
                        height: "auto",
                        maxHeight: "90vh",
                        objectFit: "contain",
                    }}
                />
            </Modal>
        </div>
    );
}

export default Header;
