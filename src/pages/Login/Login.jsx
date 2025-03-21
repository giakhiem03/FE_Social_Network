import "./Login.scss";
import { Form, Input, Button } from "antd";
import avatar from "../../assets/image/avatar.png";

function LoginPage() {
    const onFinish = (values) => {
        console.log("Dữ liệu form:", values);
    };

    // Hàm xử lý khi gửi form thất bại (validation lỗi)
    const onFinishFailed = (errorInfo) => {
        console.log("Lỗi:", errorInfo);
    };
    return (
        <div className="wrap">
            <Form
                className="custom-form"
                name="loginForm"
                layout="vertical"
                onFinish={onFinish}
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
                        label="Mật khẩu"
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
