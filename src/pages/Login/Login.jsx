import "./Login.scss";
import { Form, Input, Button } from "antd";
import avatar from "../../assets/image/avatar.png";
import { setUser } from "../../store/redux/actions/userActions";
import UserService from "../../service/UserService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const message = location.state?.message;

    useEffect(() => {
        if (message) {
            toast.info(message);
            navigate(location.pathname, { replace: true, state: null });
        }
    }, [message]);

    const handleLogin = async (data) => {
        let res = await UserService.login(data);
        console.log(res);
        if (res && res.errCode === 0) {
            dispatch(setUser(res.data));
            navigate("/", { replace: true });
            toast.success("Login success!");
        } else {
            toast.error(res.message);
        }
    };

    // Hàm xử lý khi gửi form thất bại (validation lỗi)
    const onFinishFailed = (errorInfo) => {
        console.log("Lỗi:", errorInfo);
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
                        style={{ padding: "20px 30px", marginBottom: "30px" }}
                    >
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default LoginPage;
