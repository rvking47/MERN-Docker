import axios from "axios";

const API_URL = "http://localhost:5001/api/users";


const createUser = (userData)=>{
    const user = axios.post(API_URL, userData);
    return user;
}

const listUser = ()=>{
    const users = axios.get(API_URL);
    return users;
}

export {createUser, listUser};