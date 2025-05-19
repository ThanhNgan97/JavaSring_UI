import { App, Input, Modal } from "antd";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { updateUserAPI } from "../../services/api";

interface IProps {
    openUpdateModal: boolean;
    setOpenUpdateModal: (v: boolean) => void;
    fetchUser: () => Promise<void>;
    setSelectedUser: (user: { 
        id: number; 
        name: string; 
        email: string }
        | null) => void;
    selectedUser: {
        id: number;
        name: string;
        email: string;
    } | null;
}

const UpdateUserModal = (props: IProps) => {

  const { openUpdateModal, 
        setOpenUpdateModal, 
        fetchUser, 
        selectedUser,  
        setSelectedUser } = props;
  const { notification, message } = App.useApp();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name);
      setEmail(selectedUser.email);
    }
  }, [selectedUser]);

  const handleSubmit = async () => {
    if (!selectedUser) return;

    setLoading(true);
    try {
      const res = await updateUserAPI(selectedUser.id, name, email);
      if (res.data.data) {
        message.success("Cập nhật thành công");
        setOpenUpdateModal(false);
        setName("");
        setEmail("");
        setSelectedUser(null);
        await fetchUser();
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const m = error?.response?.data?.message ?? "Lỗi không xác định";
      notification.error({
        message: "Lỗi",
        description: m
      });
    }
    setLoading(false);
  };

  return (
    <Modal
      title="Update User"
      maskClosable={false}
      open={openUpdateModal}
      onOk={handleSubmit}
      onCancel={() => {
        setOpenUpdateModal(false);
         setSelectedUser(null);
      }}
      okText="Update"
      okButtonProps={{
        loading: loading
      }}
    >
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        marginBottom: 15
      }}>
        <span>Name: </span>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 10
      }}>
        <span>Email: </span>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default UpdateUserModal;
