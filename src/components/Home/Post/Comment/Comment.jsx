import { useEffect, useState } from "react";
import CommentComponent from "./CommentComponent";
import PostService from "../../../../service/PostService";

function Comment({ postId }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        let comments = await PostService.getCommentsById(postId);
        setComments(comments.data);
    };

    const handleAddComment = async (newComment) => {
        let res = await PostService.addNewComment(newComment);
        if (res && res.errCode === 0) {
            fetchComments();
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
