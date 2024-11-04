import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { updateProduct } from "../../features/products/productSlice";

const ProductEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((store) => store.product); //  useSelector hookyla product state ne ulaşırız

  const [form] = Form.useForm();
  const product = products.find((product) => product.id === parseInt(id));

  useEffect(() => {
    // varolan ürün bilgilerini direk form daki inputlara ekleriz
    if (product) {
      form.setFieldsValue({
        ...product,
        title: product.title,
        body: product.body,
      });
    }
  }, [product, form]);

  const onFinish = (values) => {
    dispatch(updateProduct({ ...values, id: parseInt(id) }));
    navigate("/products");
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Ürün Düzenle</h2>
      <Form
        form={form}
        name="edit_product"
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
            Ürün Güncelle
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default ProductEdit;
