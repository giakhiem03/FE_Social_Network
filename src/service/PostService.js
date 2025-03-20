import axios from "../utils/axiosCustomize";

class PostService {
    getAllPosts = () => {
        return axios.get("api/getAllPosts");
    };
}

export default new PostService();
