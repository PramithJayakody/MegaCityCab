import React, { useState } from "react";
import { Card, Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { loginUser } from "../../api/userService";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await loginUser(values.username, values.password);
      message.success("Login successful!");
      // Assuming the response includes a token or user data
      // You might want to store it in localStorage or context
      localStorage.setItem("user", JSON.stringify(response));
      navigate("/");
    } catch (error) {
      message.error(error.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card title="Login to Mega City Cab" className="login-card">
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
              {
                min: 3,
                message: "Username must be at least 3 characters!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 6,
                message: "Password must be at least 6 characters!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
        <div>
          Don t have an account ? <Link to="/register">Register Now</Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
