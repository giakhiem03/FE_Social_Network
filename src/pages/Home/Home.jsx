import { useContext, useEffect } from "react";
import Post from "../../components/Home/Post/Post";
import "./Home.scss";
import CollapsedContext from "../../constants/CollapsedContext/CollapsedContext";
import Header from "../../components/Home/Header/Header";
import PostService from "../../service/PostService";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import UserService from "../../service/UserService";
import { setUser } from "../../store/redux/actions/userActions";
import { useNavigate } from "react-router";

function HomePage() {
    const collapsed = useContext(CollapsedContext);
    const account = useSelector((state) => state.user);
    const [postList, setPostList] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (account.username) {
            fetchPosts(account.username);
        }
    }, [account.username]);

    const getUser = async () => {
        let res = await UserService.getMe();
        if (res && res.errCode === 0) {
            res.data.role = res.data.Role.role_name;
            dispatch(setUser(res.data));
        } else {
            toast.error(res.message);
            navigate("/login-auth");
        }
    };

    const fetchPosts = async () => {
        let res;
        res = await PostService.getAllPosts(account.username);
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
