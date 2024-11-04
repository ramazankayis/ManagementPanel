import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, handleDeleteUser } from "../../features/users/userSlice";
import { Space, Table, Button, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Column, ColumnGroup } = Table;
const { Paragraph } = Typography;

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((store) => store.user);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  
  useEffect(() => {
    if (users.length === 0) {
      dispatch(getAllUsers());
    }
  }, [dispatch, users.length]);

  useEffect(() => {
    setFilteredUsers(
      users
        .filter(
          (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.website.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.address.city
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => b.id - a.id)
    );
  }, [searchTerm, users]);

  const handleRowClick = (record) => {
    navigate(`/user/${record.id}`);
  };

  const deleteUser = (e, userId) => {
    console.log("userId", userId);
    e.stopPropagation();
    dispatch(handleDeleteUser(userId));
  };
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
            onClick={() => navigate("/user/add")}
          >
            Kullanıcı Ekle
          </Button>
        </div>

        <Table
          pagination={{ pageSize: 50 }}
          dataSource={filteredUsers.map((user) => ({ ...user, key: user.id }))}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        >
          <ColumnGroup title="Name">
            <Column
              title="First Name"
              dataIndex="name"
              key="name"
              filters={getUniqueValues(users, "name")}
              onFilter={(value, record) => record.name.includes(value)}
            />
            <ColumnGroup
              title="Last Name"
              dataIndex="username"
              key="username"
              filters={getUniqueValues(users, "username")}
              onFilter={(value, record) => record.username.includes(value)}
            />
          </ColumnGroup>
          <Column
            title="Email"
            dataIndex="email"
            key="email"
            filters={getUniqueValues(users, "email")}
            onFilter={(value, record) => record.email.includes(value)}
          />
          <Column
            title="Address"
            dataIndex="address"
            key="address"
            render={({ city }) => <strong>{`${city} `}</strong>}
            filters={getUniqueValues(
              users.map((user) => user.address),
              "city"
            )}
            onFilter={(value, record) => record.address.city.includes(value)}
          />
          <Column
            title="Website"
            dataIndex="website"
            key="website"
            filters={getUniqueValues(users, "website")}
            onFilter={(value, record) => record.website.includes(value)}
          />
          <Column
            title="Action"
            key="action"
            render={(_, record) => (
              <Space size="middle">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/user/edit/${record.id}`);
                  }}
                  type="primary"
                >
                  Güncelle
                </Button>
                <Button
                  onClick={(e) => deleteUser(e, record.id)}
                  type="primary"
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

export default UserList;
