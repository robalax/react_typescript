import React, { FC } from "react";
import { Table, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";

interface TableProps {
  isLoading: boolean;
  data: any;
}

const CommonTable: FC<TableProps> = ({ isLoading, data }) => {
  const navigate = useNavigate();

  const goToDetail = (recordId: string) => {
    navigate(`/detail/${recordId}`);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Action",
      key: "action",
      render: (text: any) => (
        <Space size="middle">
          <Button onClick={() => goToDetail(text.name)}>Detail</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} loading={isLoading} />
    </>
  );
};

export default CommonTable;
