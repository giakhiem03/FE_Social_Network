import { useEffect, useState } from "react";
import CommentComponent from "./CommentComponent";

function Comment({ postId, postComments }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        setComments(postComments);
    }, [postComments]);

    const handleAddComment = (newComment) => {
        setComments({
            comments: [newComment, ...comments],
        });
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
