import axios from "../utils/axiosCustomize";

class UserService {
    login = (data) => {
        return axios.post("api/user/login", data);
    };

    register = (data) => {
        return axios.post("api/user/register", data);
    };

    getDetailUser = (id) => {
        return axios.get(`api/user/getDetail/${id}`);
    };

    getNotifications = (id) => {
        return axios.get(`api/user/get-notify-request-friend?id=${id}`);
    };

    getFriendList = (id) => {
        return axios.get(`api/user/friend-list?id=${id}`);
    };

    sendMessage = (room_chat_id, user_id, content, image) => {
        const formData = new FormData();
        formData.append("room_chat_id", room_chat_id);
        formData.append("user_id", user_id);
        formData.append("content", content);
        formData.append("image", image);
        return axios.post(`api/user/send-message`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    };

    getMessages = (id_1, id_2) => {
        return axios.get(`api/user/get-chat-room`, {
            params: {
                id_1,
                id_2,
            },
        });
    };
}

export default new UserService();
