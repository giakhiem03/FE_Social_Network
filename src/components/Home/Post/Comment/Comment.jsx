import { useEffect, useState } from "react";
import CommentComponent from "./CommentComponent";
import PostService from "../../../../service/PostService";
import { toast } from "react-toastify";

function Comment({ postId }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        let comments = await PostService.getCommentsById(postId);
        if (comments && comments.data && comments.errCode === 0) {
            setComments(comments.data);
        } else {
            toast.error(comments.message);
        }
    };

    const handleAddComment = async (newComment) => {
        let res = await PostService.addNewComment(newComment);
        if (res && res.errCode === 0) {
            fetchComments();
        } else {
            toast.error(res.message);
        }
    };

    return (
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <CommentComponent
                postId={postId}
                comments={comments}
                onAddComment={handleAddComment}
            />
        </div>
    );
}

export default Comment;
