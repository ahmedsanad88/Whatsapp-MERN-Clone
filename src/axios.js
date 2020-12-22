import axios from "axios";

const instance = axios.create({
    baseURL: 'https://whatsapp-clonebackend.herokuapp.com'
    // baseURL: 'http://localhost:8001'
});

export default instance;
