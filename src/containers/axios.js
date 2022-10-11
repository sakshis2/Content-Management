import axios from 'axios';

const instance = axios.create({
    baseURL: "https://content-management-application.herokuapp.com/",
});

export default instance;
