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
}

export default new UserService();
