import { List, Input, Button, Avatar } from "antd";
import {
    SendOutlined,
    CloseOutlined,
    PictureOutlined,
} from "@ant-design/icons";
import "./ListFriend.scss";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import UserService from "../../service/UserService";
import { toast } from "react-toastify";

function ListFriend() {
    const account = useSelector((state) => state.user);
    const [listFriend, setListFriend] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [currentFriend, setCurrentFriend] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        fetchListFriend();
        scrollToBottom();
    }, [messages]);

    const fetchListFriend = async () => {
        let res = await UserService.getFriendList(account.id);
        if (res && res.data && res.errCode === 0) {
            setListFriend(res.data);
        } else {
            toast.error(res.message);
        }
    };

    const handleOpenChat = (friend) => {
        setCurrentFriend(friend);
        setMessages([
            {
                id: 1,
                sender: friend.id,
                content: "Lí do chính đấng:)",
                time: "10:30",
            },
            {
                id: 2,
                sender: friend.id,
                content: "Nói vậy chắc nó tin:)",
                time: "10:31",
            },
            {
                id: 3,
                sender: account.id,
                content: "hỏi coi có ai thử",
                time: "10:32",
            },
            {
                id: 4,
                sender: friend.id,
                content: "Dù mình k có:)",
                time: "10:33",
            },
            {
                id: 5,
                sender: account.id,
                content: "t mày Khánh Na",
                time: "10:34",
            },
            { id: 6, sender: account.id, content: "4 r đó", time: "10:35" },
        ]);
        setIsChatOpen(true);
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

    const handleSendMessage = () => {
        if (newMessage.trim() === "" && !selectedImage) return;

        const newMsg = {
            id: messages.length + 1,
            sender: account.id,
            content: newMessage,
            image: imagePreview,
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
        };

        setMessages([...messages, newMsg]);
        setNewMessage("");
        setSelectedImage(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    return (
        <>
            <List
                dataSource={listFriend.map((item) => ({
                    id: item.id,
                    name: item.fullName,
                    avatar: item.avatar,
                }))}
                renderItem={(item) => (
                    <List.Item
                        onClick={() => handleOpenChat(item)}
                        className="list-items"
                    >
                        <div className="wrap-items">
                            <img
                                src={`http://localhost:3001${item.avatar}`}
                                alt={item.name}
                                style={{
                                    borderRadius: "50%",
                                    margin: "6px 12px 6px 0",
                                    width: "36px",
                                    height: "36px",
                                    maxWidth: "36px",
                                    maxHeight: "36px",
                                }}
                            />
                            <span>{item.name}</span>
                        </div>
                    </List.Item>
                )}
            />

            {currentFriend && isChatOpen && (
                <div className="chat-popup">
                    <div className="chat-header">
                        <div className="header-info">
                            <Avatar
                                src={`http://localhost:3001${currentFriend.avatar}`}
                                size={32}
                            />
                            <span className="friend-name">
                                {currentFriend.name}
                            </span>
                        </div>
                        <Button
                            type="text"
                            icon={<CloseOutlined />}
                            onClick={() => setIsChatOpen(false)}
                            className="close-button"
                        />
                    </div>
                    <div className="chat-messages">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`message ${
                                    msg.sender === account.id
                                        ? "sent"
                                        : "received"
                                }`}
                            >
                                {msg.image && (
                                    <div className="message-image">
                                        <img src={msg.image} alt="Sent" />
                                    </div>
                                )}
                                {msg.content && <div>{msg.content}</div>}
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
                                placeholder="Aa"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
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
                </div>
            )}
        </>
    );
}

export default ListFriend;
