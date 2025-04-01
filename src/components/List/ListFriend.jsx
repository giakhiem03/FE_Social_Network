import { List } from "antd";
import "./ListFriend.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserService from "../../service/UserService";
import { toast } from "react-toastify";
import Message from "../Message/Message";

function ListFriend() {
    const account = useSelector((state) => state.user);
    const [listFriend, setListFriend] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [currentFriend, setCurrentFriend] = useState(null);

    useEffect(() => {
        fetchListFriend();
    }, []);

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
        setIsChatOpen(true);
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
                <Message
                    currentFriend={currentFriend}
                    setIsChatOpen={setIsChatOpen}
                />
            )}
        </>
    );
}

export default ListFriend;
