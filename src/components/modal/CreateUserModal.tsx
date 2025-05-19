import { App, Modal} from "antd";
import {Input } from 'antd';
import { useState } from "react";
import { createUserAPI } from "../../services/api";
import { AxiosError } from "axios";

interface IProps {
  openCreatOpenModal:boolean,
  setOpenCreatOpenModal: (v : boolean) => void,
    fetchUser: () => Promise<void>;
}

const CreateUserModal = (props:IProps) => {
    const {openCreatOpenModal, setOpenCreatOpenModal, fetchUser} = props;
    const {notification, message} = App.useApp();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await createUserAPI(name,email); 
            if(res.data.data){
                message.success("Tao moi thanh cong");
                setOpenCreatOpenModal(false);
                setName("");
                setEmail("");
                await fetchUser();
            }
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const m = error?.response?.data?.message?? "unknow";
            notification.error({
                message:"Errors",
                description:m
            })
            
        } 
        setLoading(false);
    }

    return (
        <Modal
            title="Create user new"
            maskClosable={false}
            open={openCreatOpenModal}
            onOk={handleSubmit}
            onCancel={() => {
                setOpenCreatOpenModal(false)
            }}
            okText="Save"
            okButtonProps={{
                loading:loading
            }}
        >
            <div style={{
                display:"flex",
                flexDirection:"column",
                gap:10,
                marginBottom:15
                }}>
                <span>Name: </span>
                <Input
                    value={name}
                    onChange={(v) => setName(v.target.value)}
                />
            </div>

            <div style={{
                display:"flex",
                flexDirection:"column",
                gap:10
                }}>
                <span>Email: </span>
                <Input
                    value={email}
                    onChange={(v) => setEmail(v.target.value)}
                />
            </div>


        </Modal>
    )
}

export default CreateUserModal
