import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import UserService from "../../service/UserService";
import { Avatar, Button, Input, Tooltip, Modal } from "antd";
import {
    SendOutlined,
    CloseOutlined,
    PictureOutlined,
} from "@ant-design/icons";
import "./Message.scss";

function Message({ currentFriend, setIsChatOpen }) {
    const account = useSelector((state) => state.user);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [roomChatId, setRoomChatId] = useState("");
    const [messages, setMessages] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false); // State for Modal visibility
    const [modalImage, setModalImage] = useState(null); // State for the image to display in Modal
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);
    const chatMessagesRef = useRef(null);
    const newMessageRef = useRef("");
    const inputRef = useRef(null);

    const [inputKey, setInputKey] = useState(0);

    useEffect(() => {
        fetchMessages();
    }, [currentFriend]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const fetchMessages = async () => {
        try {
            let res = await UserService.getMessages(
                account.id,
                currentFriend.id
            );
            if (res && res.data && res.errCode === 0) {
                setRoomChatId(res.data.id);
                setMessages(res.data.message);
            } else {
                toast.error(res.message || "Không thể tải tin nhắn");
            }
        } catch (error) {
            console.error("Lỗi khi tải tin nhắn:", error);
            toast.error("Có lỗi xảy ra khi tải tin nhắn");
        }
    };

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleSendMessage = async () => {
        if (newMessageRef.current.trim() === "" && !selectedImage) return;

        try {
            let res = await UserService.sendMessage(
                roomChatId,
                account.id,
                newMessageRef.current,
                selectedImage
            );
            if (res && res.errCode === 0) {
                newMessageRef.current = "";
                setInputKey((prev) => prev + 1);

                setTimeout(() => {
                    if (inputRef.current) {
                        inputRef.current.focus();
                    }
                }, 1);

                setSelectedImage(null);
                setImagePreview(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
                fetchMessages();
            } else {
                toast.error(res.message || "Không thể gửi tin nhắn");
            }
        } catch (error) {
            console.error("Lỗi khi gửi tin nhắn:", error);
            toast.error("Có lỗi xảy ra khi gửi tin nhắn");
        }
    };

    const groupMessages = () => {
        const grouped = [];
        let currentGroup = null;

        messages.forEach((msg) => {
            if (!currentGroup || currentGroup.user_id !== msg.user_id) {
                currentGroup = {
                    user_id: msg.user_id,
                    messages: [msg],
                    timestamp: new Date(msg.createdAt),
                };
                grouped.push(currentGroup);
            } else {
                currentGroup.messages.push(msg);
                currentGroup.timestamp = new Date(msg.createdAt);
            }
        });

        return grouped;
    };

    const groupedMessages = useMemo(() => groupMessages(), [messages]);

    const handleImageClick = (imageUrl) => {
        setModalImage(imageUrl);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setModalImage(null);
    };

    return (
        <div className="chat-popup">
            <div className="chat-header">
                <div className="header-info">
                    <Avatar
                        src={`http://localhost:3001${currentFriend.avatar}`}
                        size={32}
                    />
                    <span className="friend-name">{currentFriend.name}</span>
                </div>
                <Button
                    type="text"
                    icon={<CloseOutlined />}
                    onClick={() => setIsChatOpen(false)}
                    className="close-button"
                />
            </div>

            <div className="chat-messages" ref={chatMessagesRef}>
                {groupedMessages.map((group, index) => (
                    <div
                        key={index}
                        className={`message-group ${
                            group.user_id === account.id ? "sent" : "received"
                        }`}
                    >
                        {group.user_id !== account.id && (
                            <Avatar
                                src={`http://localhost:3001${currentFriend.avatar}`}
                                size={36}
                                className="message-avatar"
                            />
                        )}
                        <div className="message-bubble-container">
                            {group.messages.map((msg) => (
                                <div key={msg.id} className="message-bubble">
                                    {msg.image && (
                                        <div
                                            className="message-image"
                                            onClick={() =>
                                                handleImageClick(
                                                    `http://localhost:3001${msg.image}`
                                                )
                                            }
                                            style={{ cursor: "pointer" }}
                                        >
                                            <img
                                                src={`http://localhost:3001${msg.image}`}
                                                alt="Sent"
                                                className="message-image-content"
                                                onLoad={scrollToBottom}
                                            />
                                        </div>
                                    )}
                                    {msg.content && (
                                        <Tooltip
                                            title={new Date(
                                                msg.createdAt
                                            ).toLocaleString()}
                                        >
                                            <div className="message-content">
                                                {msg.content}
                                            </div>
                                        </Tooltip>
                                    )}
                                </div>
                            ))}
                            <div className="message-time">
                                {group.timestamp.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </div>
                        </div>
                        {group.user_id === account.id && (
                            <Avatar
                                src={`http://localhost:3001${
                                    account.avatar ||
                                    "/images/default-avatar.png"
                                }`}
                                size={36}
                                className="message-avatar"
                            />
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-container">
                {imagePreview && (
                    <div className="image-preview">
                        <img src={imagePreview} alt="Preview" />
                        <Button
                            type="text"
                            icon={<CloseOutlined />}
                            onClick={handleRemoveImage}
                            className="remove-image"
                        />
                    </div>
                )}
                <div className="chat-input">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        style={{ display: "none" }}
                        ref={fileInputRef}
                    />
                    <Button
                        type="text"
                        icon={<PictureOutlined />}
                        onClick={() => fileInputRef.current?.click()}
                        className="image-button"
                    />
                    <Input
                        key={inputKey}
                        ref={inputRef}
                        placeholder="Aa"
                        defaultValue=""
                        onChange={(e) => {
                            newMessageRef.current = e.target.value;
                        }}
                        onKeyDown={handleKeyPress}
                    />
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<SendOutlined />}
                        onClick={handleSendMessage}
                    />
                </div>
            </div>

            <Modal
                visible={isModalVisible}
                footer={null}
                onCancel={handleModalClose}
                centered
            >
                <img src={modalImage} alt="Preview" style={{ width: "100%" }} />
            </Modal>
        </div>
    );
}

export default Message;
