import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Space, Table, Button, Input, Typography } from "antd";
import {
  getAllProducts,
  handleDeleteProduct,
} from "../../features/products/productSlice";
import { useNavigate } from "react-router-dom";

const { Column } = Table;
const { Paragraph } = Typography;
const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((store) => store.product);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products); 

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getAllProducts());
    }
  }, [dispatch, products.length]);

  useEffect(() => {   
    // liste ki elemanlar için  arama işlemi includes ile  ve sıralama sort ile  yapar
    setFilteredProducts(
      products
        .filter(
          (product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.body.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => b.id - a.id)
    );
  }, [searchTerm, products]);

  const handleRowClick = (record) => {
    navigate(`/products/${record.id}`);
  };

  // ürün silme fonk.
  const deleteProduct = (e, productId) => {
    // e.stopPropagation() kullanarak, satırın onClick olayını tetiklemesini engeller.
    //Bu sayede yalnızca "Delete" butonuna tıklandığında silme işlemi çalışır.
    e.stopPropagation(); 
    dispatch(handleDeleteProduct(productId));
  };

  //Bu fonksiyon, belirtilen key alanına göre benzersiz değerlerin bir listesini döndürür.
  const getUniqueValues = (data, key) => {
    return [...new Set(data.map((item) => item[key]))].map((value) => ({
      text: value,
      value,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div>
        <div style={{ marginBottom: "20px" }}>
          <Paragraph>
            <strong> Arama </strong>
          </Paragraph>
          <Input
            placeholder="Genel Arama : name, lastname, email ve adres vs..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ marginBottom: 16, width: "50%" }}
          />
          <Button
            style={{ float: "inline-end" }}
            type="primary"
            onClick={() => navigate("/products/add")}
            color="deepskyblue"
            variant="outlined"
          >
            Ürün Ekle
          </Button>
        </div>
        <Table
          dataSource={filteredProducts.map((product) => ({
            ...product,
            key: product.id,
          }))}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        >
          <Column
            title="Başlık"
            dataIndex="title"
            key="title"
            filters={getUniqueValues(products, "title")}
            onFilter={(value, record) => record.title.includes(value)}
          />

          <Column
            title="içerik"
            dataIndex="body"
            key="body"
            filters={getUniqueValues(products, "body")}
            onFilter={(value, record) => record.body.includes(value)}
          />

          <Column
            title="Action"
            key="action"
            render={(_, record) => (
              <Space size="middle">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/products/edit/${record.id}`);
                  }}
                  type="link"
                >
                  Güncelle
                </Button>
                <Button
                  onClick={(e) => deleteProduct(e, record.id)}
                  type="default"
                  danger
                >
                  Silme
                </Button>
              </Space>
            )}
          />
        </Table>
      </div>
    </>
  );
};

export default ProductList;
