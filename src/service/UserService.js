import axios from "../utils/axiosCustomize";

class UserService {
    login = (data) => {
        return axios.post("api/user/login-auth", data);
    };

    register = (data) => {
        return axios.post("api/user/register", data);
    };

    getDetailUser = (id) => {
        return axios.get(`api/user/${id}`);
    };

    getNotifications = (id) => {
        return axios.get(`api/user/get-notify-request-friend?id=${id}`);
    };

    getFriendList = (id) => {
        return axios.get(`api/user/friend-list?id=${id}`);
    };

    // sendMessage = (room_chat_id, user_id, content, image) => {
    //     const formData = new FormData();
    //     formData.append("room_chat_id", room_chat_id);
    //     formData.append("user_id", user_id);
    //     formData.append("content", content);
    //     formData.append("image", image);
    //     return axios.post(`api/user/send-message`, formData, {
    //         headers: {
    //             "Content-Type": "multipart/form-data",
    //         },
    //     });
    // };

    // getMessages = (id_1, id_2) => {
    //     return axios.get(`api/user/get-chat-room`, {
    //         params: {
    //             id_1,
    //             id_2,
    //         },
    //     });
    // };

    searchUsersByFullname = (fullName) => {
        return axios.get(`api/user/search?fullName=${fullName}`);
    };

    getMe = () => {
        return axios.get(`api/user/me`);
    };

    logout = () => {
        return axios.post(`api/user/logout`);
    };

    updateProfile = (data) => {
        const formData = new FormData();
        formData.append("id", data.id);
        formData.append("fullName", data.fullName);
        formData.append("bio", data.bio);
        if (data?.avatar) formData.append("avatar", data?.avatar);
        if (data?.background) formData.append("background", data?.background);
        return axios.put(`api/user/update-profile`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    };

    addNewFriend = (user_1, user_2) => {
        return axios.post(
            `api/user/addfriend?user_1=${user_1}&user_2=${user_2}`
        );
    };

    acceptRequestAddFriend = (user_1, user_2) => {
        return axios.post(
            `api/user/acceptRequestAddFriend?user_1=${user_1}&user_2=${user_2}`
        );
    };

    rejectRequestAddFriend = (user_1, user_2) => {
        return axios.post(
            `api/user/rejectRequestAddFriend?user_1=${user_1}&user_2=${user_2}`
        );
    };
}

export default new UserService();
