import axios from 'axios';

export const baseURL = "http://localhost:8080";
// export const baseURL = "https://petcare-rest.herokuapp.com";


const api = axios.create({
    baseURL,
    timeout: 3000
});

export default api;
