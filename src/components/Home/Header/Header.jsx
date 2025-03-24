import "./Header.scss";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/redux/actions/userActions";

function Header() {
    // const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleLogin = () => {
        dispatch(
            setUser({
                id: 1,
                fullname: "Huỳnh Gia Khiêm",
                name: "John Doe",
                email: "john@example.com",
            })
        );
    };

    return (
        <div className="wrap-header-home">
            <div className="post-input">
                <div className="avatar">
                    <img
                        src="https://my.alfred.edu/zoom/_images/foster-lake.jpg"
                        alt="Your profile"
                    />
                </div>
                <input type="text" placeholder="What's on your mind?" />
            </div>
            <div className="post-actions">
                <div className="action-buttons">
                    <button>📷</button>
                    <button>🔗</button>
                    <button>📍</button>
                    <button>😊</button>
                </div>
                <button onClick={handleLogin} className="post-button">
                    Post
                </button>
            </div>
        </div>
    );
}

export default Header;
