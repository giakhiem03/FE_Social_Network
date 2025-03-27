import { useState } from "react";
import { useSelector } from "react-redux";
import PostService from "../../../service/PostService";
import { Button } from "antd";

const LikeButton = ({ postId, initialLikes, isLiked }) => {
    const account = useSelector((state) => state.user);
    const [localLike, setLocalLike] = useState(isLiked);
    const [likeCount, setLikeCount] = useState(initialLikes);
    const [loading, setLoading] = useState(false);
    const handleLike = async () => {
        if (!account?.id) return;

        setLoading(true);
        setLocalLike((prev) => !prev);
        setLikeCount((prev) => (localLike ? prev - 1 : prev + 1));

        try {
            await PostService.reactionPost(account.id, postId);
        } catch (error) {
            console.error("Lỗi khi like bài viết:", error);
            // Rollback nếu có lỗi
            setLocalLike((prev) => !prev);
            setLikeCount((prev) => (localLike ? prev + 1 : prev - 1));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button onClick={handleLike} disabled={loading}>
            {localLike ? "💖 Unlike" : "🤍 Like"} ({likeCount})
        </Button>
    );
};

export default LikeButton;
