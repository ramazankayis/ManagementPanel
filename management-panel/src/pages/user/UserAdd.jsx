import React from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Input } from "antd";
import { addUser } from "../../features/users/userSlice"; // addUser action'ını oluşturmalısınız
import { useNavigate } from "react-router-dom";

const UserAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    const userData = {
      ...values,
      address: {
        city: values.address,
      },
    };

    dispatch(addUser(userData));
    navigate("/user");
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Yeni Kullanıcı Ekle</h2>
      <Form form={form} name="add_user" layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="First Name"
          name="name"
          rules={[{ required: true, message: "Please input the first name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="username"
          rules={[{ required: true, message: "Please input the last name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input the email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Website"
          name="website"
          rules={[{ required: true, message: "Please input the website!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input the last name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Kullanıcı Ekle
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserAdd;
