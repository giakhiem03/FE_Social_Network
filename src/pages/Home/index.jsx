import UserService from "../../service/UserService";

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
            <button onClick={getDetailUser}>Get User</button>
        </div>
    );
}

export default HomePage;
