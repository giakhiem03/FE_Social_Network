import UserService from "../../service/UserService";
import { Button } from "antd";
function HomePage() {
    const getDetailUser = () => {
        let res = UserService.getDetailUser(1);
        if (res && res.errCode === 0) {
            console.log("get succeed");
        } else {
            console.log("get failed");
        }
    };

    return (
        <div>
            Home Page
            <Button type="dashed" onClick={getDetailUser}>
                Get User
            </Button>
        </div>
    );
}

export default HomePage;
