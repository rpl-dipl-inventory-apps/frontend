import axios from 'configs/axios';

const users = {
    create: (data, supplier = false) =>
        axios.post(`/users?supplier=${supplier}`, data),
    login: (data) => axios.post('/users/login', data),
    verify: () => axios.get(`/users/verify`),
    refreshToken: () => axios.post('/users/refresh'),
    logout: () => axios.post('/users/logout'),
    edit: (data) => axios.put('/users/edit', data),
    getAll: () => axios.get('/users'),
};

export default users;
