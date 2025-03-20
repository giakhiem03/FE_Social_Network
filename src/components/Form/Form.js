import "./Form.scss";
import { Form, Input, Button } from "antd";

function FormCustom() {
    // Hàm xử lý khi gửi form thành công
    const onFinish = (values) => {
        console.log("Dữ liệu form:", values);
    };

    // Hàm xử lý khi gửi form thất bại (validation lỗi)
    const onFinishFailed = (errorInfo) => {
        console.log("Lỗi:", errorInfo);
    };
    return (
        <Form
            className="custom-form"
            name="loginForm" // Tên form (tùy chọn, để định danh)
            layout="vertical" //vertical, horizontal, hoặc inline
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{ username: "", password: "" }}
            size="large"
        >
            <h1 className="login-text">Login</h1>
            <div className="wrap-input-login">
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
                <Button type="primary" htmlType="submit" style={{}}>
                    Đăng nhập
                </Button>
            </Form.Item>
        </Form>
    );
}

export default FormCustom;
