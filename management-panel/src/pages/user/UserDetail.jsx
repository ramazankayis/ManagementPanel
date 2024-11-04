import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

const UserDetail = () => {
  const { id } = useParams();  
  const { users } = useSelector((store) => store.user);   
  const user = users.find((user) => user.id === parseInt(id));

  if (!user) {
    return <div>Kullanıcı bulunamadı.</div>;
  }

  return (
    <Card title={`${user.name}'s Details`} style={{ width: 400, margin: "20px auto" }}>
      <Title level={4}>Kullanıcı Bilgileri</Title>
      <Paragraph>
        <strong>Ad:</strong> {user.name}
      </Paragraph>
      <Paragraph>
        <strong>Kullanıcı Adı:</strong> {user.username}
      </Paragraph>
      <Paragraph>
        <strong>Email:</strong> {user.email}
      </Paragraph>
      <Paragraph>
        <strong>Şehir:</strong> {user.address.city}
      </Paragraph>
      <Paragraph>
        <strong>Sokak:</strong> {user.address.street}
      </Paragraph>
      <Paragraph>
        <strong>Posta Kodu:</strong> {user.address.zipcode}
      </Paragraph>
      <Paragraph>
        <strong>Website:</strong> {user.website}
      </Paragraph>
    </Card>
  );
};

export default UserDetail;