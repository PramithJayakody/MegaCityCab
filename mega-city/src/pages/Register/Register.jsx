import React, { useState } from "react";
import { Card, Form, Input, Button, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  PhoneOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { saveUser } from "../../api/userService";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const userData = {
        name: values.name,
        username: values.username,
        password: values.password,
        contactNumber: values.contactNumber,
        role: "CUSTOMER",
      };

      await saveUser(userData);
      message.success("Registration successful!");
      navigate("/");
    } catch (error) {
      message.error(error.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <Card title="Register for Mega City Cab" className="register-card">
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your full name!",
              },
              {
                min: 3,
                message: "Name must be at least 3 characters!",
              },
            ]}
          >
            <Input
              prefix={<UserAddOutlined />}
              placeholder="Full Name"
              size="large"
            />
          </Form.Item>

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

          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="contactNumber"
            rules={[
              {
                required: true,
                message: "Please input your contact number!",
              },
              {
                pattern: /^\d{10}$/,
                message: "Please enter a valid 10-digit contact number!",
              },
            ]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Contact Number"
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
              Register
            </Button>
          </Form.Item>
        </Form>
        <div>
          Already have an account ? <Link to="/login">Login Now</Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;
