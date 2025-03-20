import axios from "../utils/axiosCustomize";

class UserService {
    getDetailUser = (id) => {
        return axios.get(`api/getDetail/${id}`);
    };
}

export default new UserService();
