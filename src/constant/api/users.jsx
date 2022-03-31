import axios from 'configs/axios';

const users = {
    create: (data) => axios.post('/users', data),
    login: (data) => axios.post('/users/login', data),
    verify: () => axios.get(`/users/verify`),
    refreshToken: () => axios.post('/users/refresh'),
    logout: () => axios.post('/users/logout'),
    edit: (data) => axios.put('/users/edit', data),
};

export default users;
