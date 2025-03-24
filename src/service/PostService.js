import axios from "../utils/axiosCustomize";

class PostService {
    getAllPosts = () => {
        return axios.get("api/post");
    };

    getCommentsById = (id) => {
        return axios.get(`api/post/get-comments?id=${id}`);
    };

    addNewComment = (newComment) => {
        const formData = new FormData();
        formData.append("image", newComment.image);
        formData.append("post_id", newComment.post_id);
        formData.append("user_id", newComment.user_id);
        formData.append("content", newComment.content);

        return axios.post("api/post/comment", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    };
}

export default new PostService();
