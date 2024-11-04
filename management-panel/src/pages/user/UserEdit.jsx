import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../../features/users/userSlice";

const UserEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((store) => store.user);

  const [form] = Form.useForm();
  const user = users.find((user) => user.id === parseInt(id));

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        ...user,
        address: user.address?.city,
      });
    }
  }, [user, form]);

  const onFinish = (values) => {
    const userData = {
      ...values,
      address: {
        city: values.address,
      },
    };

  
    dispatch(updateUser({ ...userData, id: parseInt(id) }));
    navigate("/user");
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Kullanıcı Düzenle</h2>
      <Form form={form} name="edit_user" layout="vertical" onFinish={onFinish}>
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
            Kullanıcı  Güncelle
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default UserEdit;
