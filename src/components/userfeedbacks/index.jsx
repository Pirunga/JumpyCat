import React from "react";
import axios from "axios";
import { Table } from "antd";
import { useState, useEffect } from "react";

const UserFeedBack = ({ id }) => {
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
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
    },
  ];

  const [dataSource, setDataSource] = useState([]);

  const getUsers = () => {
    axios
      .get(`https://ka-users-api.herokuapp.com/users/${id}/feedbacks/`, {
        headers: { Authorization: token },
      })
      .then((res) => {
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

export default UserFeedBack;
