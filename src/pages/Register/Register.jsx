import "./Register.scss";
import { Form, Input, Button, Checkbox } from "antd";
import UserService from "../../service/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function RegisterPage() {
    const navigate = useNavigate();
    const handleRegister = async (data) => {
        let res = await UserService.register(data);
        if (res && res.errCode === 0) {
            navigate("/login", {
                replace: true,
            });
            toast.success("Registration successful!");
        } else {
            toast.error(res.message);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Error:", errorInfo);
    };

    return (
        <div className="wrap-register">
            <Form
                className="custom-form"
                name="registerForm"
                layout="vertical"
                onFinish={handleRegister}
                onFinishFailed={onFinishFailed}
                initialValues={{
                    username: "",
                    password: "",
                    email: "",
                    confirmPassword: "",
                }}
            >
                <div className="wrap-input-register">
                    <h1 className="register-text">Register</h1>
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
                            {
                                min: 6,
                                message:
                                    "Password must be at least 6 characters!",
                            },
                        ]}
                    >
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        dependencies={["password"]}
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your password!",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("password") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error("Passwords do not match!")
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Confirm your password" />
                    </Form.Item>
                </div>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        style={{ padding: "10px 30px", marginBottom: "20px" }}
                    >
                        Register
                    </Button>
                </Form.Item>

                <div className="login-link">
                    Already have an account? <a href="/login">Login here</a>
                </div>
            </Form>
        </div>
    );
}

export default RegisterPage;
