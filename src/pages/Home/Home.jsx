import { useContext } from "react";
import Post from "../../components/Home/Post/Post";
import UserService from "../../service/UserService";
import "./Home.scss";
import CollapsedContext from "../../constants/CollapsedContext/CollapsedContext";
import Header from "../../components/Home/Header/Header";

function HomePage() {
    // const getDetailUser = () => {
    //     let res = UserService.getDetailUser(1);
    //     if (res && res.errCode === 0) {
    //         console.log("get succeed");
    //     } else {
    //         console.log("get failed");
    //     }
    // };
    const collapsed = useContext(CollapsedContext);

    return (
        <div
            className="wrap-home"
            style={collapsed ? { width: 900 } : { width: 700 }}
        >
            <Header />
            <Post />
        </div>
    );
}

export default HomePage;
