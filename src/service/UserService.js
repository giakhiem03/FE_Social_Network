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
}

export default new UserService();
