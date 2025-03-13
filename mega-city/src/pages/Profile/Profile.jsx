import { useEffect, useState } from "react";
import { Card, Form, Input, Button, message, Space } from "antd";
import { getUserById, updateUser } from "../../api/userService";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userId = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.["id"];
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserById(userId());
        form.setFieldsValue({
          name: userData.name,
          username: userData.username,
          contactNumber: userData.contactNumber,
        });
      } catch (error) {
        message.error("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, [form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await updateUser(userId(), {
        name: values.name,
        username: values.username,
      });
      message.success("Profile updated successfully");
    } catch (error) {
      message.error("Failed to update profile");
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    message.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div
      className="p-6"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 120,
      }}
    >
      <Card
        title="My Profile"
        style={{
          width: 500,
        }}
        extra={
          <Button danger onClick={handleLogout}>
            Logout
          </Button>
        }
        className="max-w-lg mx-auto"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please input your name!" },
              { min: 2, message: "Name must be at least 2 characters" },
              { max: 50, message: "Name cannot be longer than 50 characters" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: "Please input your username!" },
              { min: 3, message: "Username must be at least 3 characters" },
              {
                max: 20,
                message: "Username cannot be longer than 20 characters",
              },
              {
                pattern: /^[a-zA-Z0-9_]+$/,
                message:
                  "Username can only contain letters, numbers and underscore",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Contact Number"
            name="contactNumber"
            rules={[
              { required: true, message: "Please input your contact number!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                Update Profile
              </Button>
              <Button onClick={() => form.resetFields()}>Reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Profile;
