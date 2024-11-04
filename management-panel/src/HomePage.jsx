

import React from "react";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/user");
  };

  return (
    <div style={styles.container}>
      <Title level={2} style={styles.title}>
        Hoş Geldiniz!
      </Title>
      <Paragraph style={styles.paragraph}>
        Sitemize hoş geldiniz! Burada kullanıcılarınızı yönetebilir, yeni
        kullanıcı ekleyebilir veya mevcut kullanıcıları güncelleyebilirsiniz.
      </Paragraph>
      <Button type="primary" onClick={handleNavigate} style={styles.button}>
        Kullanıcı Listesine Git
      </Button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
  },
  title: {
    color: "#1890ff",
  },
  paragraph: {
    maxWidth: 500,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
};

export default HomePage;
