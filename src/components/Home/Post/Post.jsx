import { Card, Avatar, Button, Divider } from "antd";
import {
    UserOutlined,
    LikeOutlined,
    CommentOutlined,
    ShareAltOutlined,
} from "@ant-design/icons";
import "./Post.scss";
import Comment from "./Comment/Comment.jsx";
import { useEffect, useState } from "react";
import PostService from "../../../service/PostService.js";
import { toast } from "react-toastify";

function Post() {
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        let res = await PostService.getAllPosts();
        console.log(res);
        if (res && res.data && res.errCode === 0) {
            setPostList(res.data);
        } else {
            toast.success(res.message);
        }
    };

    // const postList = [
    //     {
    //         id: 1,
    //         avatar: <Avatar size={"large"} icon={<UserOutlined />} />,
    //     },
    //     {
    //         id: 2,
    //         avatar: <Avatar size={"large"} icon={<UserOutlined />} />,
    //     },
    // ];

    return (
        <>
            {postList &&
                postList.length > 0 &&
                postList.map((post) => (
                    <Card key={post.id} style={{ marginBottom: 16 }}>
                        <Card.Meta
                            // avatar={post?.avatar}
                            title="Some User"
                            description="20 minutes ago"
                            className="wrap-post"
                        />
                        <div style={{ marginTop: 16 }}>
                            <p>
                                This is a post like on social media. It can
                                contain text, images, and other media.
                            </p>
                            <div
                                style={{
                                    borderRadius: 8,
                                    overflow: "hidden",
                                    width: "100%",
                                    backgroundColor: "#f2f2f2", // tùy chọn nếu ảnh không phủ hết khung
                                    textAlign: "center", // để căn giữa ảnh
                                }}
                            >
                                <img
                                    src="https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/485059298_969209485394154_8363760988421917504_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=vNLFXfjYsE4Q7kNvgGdQZV1&_nc_oc=AdmoaCHNH6PZMla8WJtel1m8TyEKVmXCC9e7AeKuikVHUXt8ioMVwqGAlWiNjOiidMA2SRbq7erTdQLRrf2yIoTh&_nc_zt=23&_nc_ht=scontent.fsgn5-10.fna&_nc_gid=-zh-BQXkvcNHm1w7ximMDg&oh=00_AYExftgvnIkZvl1Azd2kTJXIK5B1voMes6Xkd-0x0ZUgaA&oe=67E43D75"
                                    alt="background"
                                    style={{
                                        width: "100%",
                                        objectFit: "contain", // giống backgroundSize: "contain"
                                        display: "block", // tránh khoảng trắng dưới ảnh
                                    }}
                                />
                            </div>
                        </div>
                        <Divider />
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Button icon={<LikeOutlined />}>Like</Button>
                            <Button icon={<CommentOutlined />}>Comment</Button>
                            <Button icon={<ShareAltOutlined />}>Share</Button>
                        </div>
                        <Divider />
                        <Comment
                            postId={post.id}
                            postComments={post.comments}
                        />
                        {/* <div className="wrap-comment">
                            <Avatar
                                icon={<UserOutlined />}
                                style={{ marginRight: 8 }}
                            />
                            <TextArea
                                rows={1}
                                placeholder="Write a comment..."
                            />
                        </div> */}
                    </Card>
                ))}
        </>
    );
}

export default Post;
