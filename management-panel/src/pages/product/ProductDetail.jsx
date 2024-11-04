import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useSelector((store) => store.product);
  const product = products.find((product) => product.id === parseInt(id));

  if (!product) {
    return <div>Ürün bulunamadı.</div>;
  }

  return (
    <Card
      title={`${product.title}'s Details`}
      style={{ width: 400, margin: "20px auto" }}
    >
      <Title level={4}>Ürün Bilgileri</Title>
      <Paragraph>
        <strong>Başlık:</strong> {product.title}
      </Paragraph>
      <Paragraph>
        <strong>İçerik:</strong> {product.body}
      </Paragraph>
    </Card>
  );
};

export default ProductDetail;
