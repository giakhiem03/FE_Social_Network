import Post from "../../components/Post/Post";
import UserService from "../../service/UserService";
import { Button } from "antd";
function HomePage() {
    // const getDetailUser = () => {
    //     let res = UserService.getDetailUser(1);
    //     if (res && res.errCode === 0) {
    //         console.log("get succeed");
    //     } else {
    //         console.log("get failed");
    //     }
    // };

    return (
        <div className="wrap-home">
            Home Page
            <Post />
        </div>
    );
}

export default HomePage;
