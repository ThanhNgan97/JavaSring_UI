import axios from "axios"


const getUserAPI = () => {

    const url = `${import.meta.env.VITE_BACKEND_URL}/users`;
    return (
        axios.get(url)
    )
}

const createUserAPI = (name:string, email:string) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/users`;
    return axios.post(url, {name, email});
}

const updateUserAPI = (id:number, name:string, email:string) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/users/${id}`;
    return axios.put(url, {id, name, email});
}

export {
    getUserAPI,
    createUserAPI,
    updateUserAPI
} 

    
