import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import CreateUserModal from "../components/modal/CreateUserModal";
import UpdateUserModal from "../components/modal/UpdateUserModal";
import { getUserAPI } from "../services/api";

interface IdUser {
  id: number;
  name: string;
  email: string;
}

const UserPage = () => {
  const [users, setUsers] = useState<IdUser[]>([]);
  const [openCreateOpenModal, setOpenCreateOpenModal] = useState<boolean>(false);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<IdUser | null>(null);

  const fetchUser = async () => {
    const res = await getUserAPI();
    if (res?.data?.status === "success") {
      setUsers(res.data.data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleClickEdit = (data: IdUser): void => {
    setSelectedUser(data);
    setOpenUpdateModal(true);
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Action',
      render: (_: string, record: IdUser) => {
        return (
          <>
            <EditOutlined
              onClick={() => handleClickEdit(record)}
              style={{ cursor: "pointer", color: '#48CAE4', marginRight: 10 }}
            />
            <DeleteOutlined
              style={{ cursor: "pointer", color: '#0077b6', marginRight: 10 }}
            />
          </>
        );
      }
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h3>Table User</h3>
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={() => setOpenCreateOpenModal(true)}
        >
          Add Users
        </Button>
      </div>

      <Table
        bordered
        dataSource={users}
        columns={columns}
        rowKey={"id"}
      />

      <CreateUserModal
        openCreatOpenModal={openCreateOpenModal}
        setOpenCreatOpenModal={setOpenCreateOpenModal}
        fetchUser={fetchUser}
      />

      <UpdateUserModal
        openUpdateModal={openUpdateModal}
        setOpenUpdateModal={setOpenUpdateModal}
        fetchUser={fetchUser}
        selectedUser={selectedUser}
        setSelectedUser = { setSelectedUser}
      />
    </div>
  );
};

export default UserPage;
