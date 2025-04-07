import "./Login.scss";
import { Form, Input, Button } from "antd";
import avatar from "../../assets/image/avatar.png";
// import { setUser } from "../../store/redux/actions/userActions";
import UserService from "../../service/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/redux/actions/userActions";
import { useEffect } from "react";

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const access_token = useSelector((state) => state.user.access_token);

    useEffect(() => {
        if (access_token) {
            navigate("/"); // Nếu đã đăng nhập thì chuyển về trang chủ
        }
    }, [access_token]);

    const handleLogin = async (data) => {
        try {
            let res = await UserService.login(data);
            if (res && res.errCode === 0) {
                dispatch(setUser({ access_token: res.data }));
                navigate("/");
                toast.success("Login success!");
            } else {
                toast.error(res.message || "Đăng nhập không thành công");
            }
        } catch (error) {
            // console.error("Login error:", error);

            // Xử lý lỗi dựa trên loại
            if (typeof error === "string") {
                // Lỗi từ interceptor "Network error or server is down"
                toast.error(error);
            } else if (error && error.message) {
                toast.error(error.message);
            } else {
                toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
            }
        }
    };

    // Hàm xử lý khi gửi form thất bại (validation lỗi)
    const onFinishFailed = (errorInfo) => {
        console.log("Lỗi:", errorInfo);
    };

    const handleRegisterClick = () => {
        navigate("/register");
    };

    return (
        <div className="wrap-login">
            <Form
                className="custom-form"
                name="loginForm"
                layout="vertical"
                onFinish={handleLogin}
                onFinishFailed={onFinishFailed}
                initialValues={{ username: "", password: "" }}
                size="large"
            >
                <img src={avatar} className="avatar" />
                <div className="wrap-input-login">
                    <h1 className="login-text">LOGIN</h1>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your username!",
                            },
                        ]}
                    >
                        <Input placeholder="Enter your username" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your password!",
                            },
                        ]}
                    >
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>
                </div>

                <Form.Item>
                    <Button
                        type="default"
                        htmlType="submit"
                        size="large"
                        style={{ padding: "20px 30px", marginBottom: "15px" }}
                    >
                        Login
                    </Button>
                </Form.Item>

                <div className="register-link">
                    <span>Don't have an account?</span>
                    <Button
                        type="link"
                        onClick={handleRegisterClick}
                        style={{
                            fontWeight: "bold",
                            fontSize: "16px",
                            padding: "0 8px",
                        }}
                    >
                        Register now
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default LoginPage;
