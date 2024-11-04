import React from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../features/products/productSlice";

const ProductAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    dispatch(addProduct(values));
    navigate("/products");
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Yeni Ürün Ekle</h2>
      <Form
        form={form}
        name="add_product"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Başlık"
          name="title"
          rules={[{ required: true, message: "Please input the first name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="içerik"
          name="body"
          rules={[{ required: true, message: "Please input the last name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Ürün Ekle
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductAdd;
