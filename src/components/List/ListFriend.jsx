import { Layout, Menu, List } from "antd";
import "./ListFriend.scss";

function ListFriend({ ListFriend, onclick }) {
    return (
        <List
            dataSource={ListFriend.map((item) => ({
                name: item.fullname,
                avatar: item.image,
            }))}
            renderItem={(item) => (
                <List.Item
                    onClick={() => onclick?.(item.id) || console.log(item.name)}
                    className="list-items"
                >
                    <div className="wrap-items">
                        <img
                            src={item.avatar}
                            alt={item.name}
                            style={{
                                borderRadius: "50%",
                                marginRight: "8px",
                                width: "30px",
                            }}
                        />
                        <span>{item.name}</span>
                    </div>
                </List.Item>
            )}
        />
    );
}

export default ListFriend;
