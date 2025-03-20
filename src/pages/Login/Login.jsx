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
            {/* <div className="loginbox">
                <img src={avatar} className="avatar" />
                <h1>LOG-IN</h1>
                <form>
                    <p>Username</p>
                    <input type="text" name="" placeholder="Who are you ?" />
                    <p>Password</p>
                    <input
                        type="password"
                        name=""
                        placeholder="Prove that it is true"
                    />
                    <input type="submit" name="" value="Login" />
                    <a href="#">Lost your password?</a> <br />
                    <a href="#">Don't have an account?</a>
                </form>
            </div> */}

            <Form
                className="custom-form"
                name="loginForm" // Tên form (tùy chọn, để định danh)
                layout="vertical" //vertical, horizontal, hoặc inline
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{ username: "", password: "" }}
                size="large"
            >
                <img src={avatar} className="avatar" />
                <div className="wrap-input-login">
                    <h1 className="login-text">ĐĂNG NHẬP</h1>
                    <Form.Item
                        label="Tên người dùng"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên người dùng!",
                            },
                        ]}
                    >
                        <Input placeholder="Nhập tên người dùng" />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mật khẩu!",
                            },
                        ]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu" />
                    </Form.Item>
                </div>

                <Form.Item>
                    <Button type="default" htmlType="submit">
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default LoginPage;
