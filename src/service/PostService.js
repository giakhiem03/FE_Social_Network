import axios from "../utils/axiosCustomize";

class PostService {
    getAllPosts = () => {
        return axios.get("api/post");
    };
}

export default new PostService();
