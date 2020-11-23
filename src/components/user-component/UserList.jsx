import React from "react";
import axios from "axios";
import { Table } from "antd";
import { useState, useEffect } from "react";

const UserList = () => {
  const token = window.localStorage.getItem("authToken");

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  const [dataSource, setDataSource] = useState([]);

  const getUsers = () => {
    axios
      .get("https://ka-users-api.herokuapp.com/users", {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log(res);

        return setDataSource(res.data);
      });
  };

  useEffect(getUsers, []);
  return (
    <div>
      <Table dataSource={dataSource} columns={columns}></Table>
    </div>
  );
};

export default UserList;
