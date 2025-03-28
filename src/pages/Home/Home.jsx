import { useContext } from "react";
import Post from "../../components/Home/Post/Post";
import "./Home.scss";
import CollapsedContext from "../../constants/CollapsedContext/CollapsedContext";
import Header from "../../components/Home/Header/Header";
import PostService from "../../service/PostService";
import { useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";

function HomePage() {
    const collapsed = useContext(CollapsedContext);
    const account = useSelector((state) => state.user);
    const [postList, setPostList] = useState([]);
    const fetchPosts = async () => {
        let res = await PostService.getAllPosts(account.username);
        console.log("data", res);
        if (res && res.data && res.errCode === 0) {
            setPostList(res.data);
        } else {
            toast.error(res.message);
        }
    };
    return (
        <div
            className="wrap-home"
            style={collapsed ? { width: 900 } : { width: 700 }}
        >
            <Header fetchPosts={fetchPosts} />
            <Post postList={postList} fetchPosts={fetchPosts} />
        </div>
    );
}

export default HomePage;
