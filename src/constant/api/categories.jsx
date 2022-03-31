import axios from 'configs/axios';

const categories = {
    create: (data) => axios.post('/categories', data),
    update: (data) => axios.put(`/categories/${data.id}`, data),
    delete: (data) => axios.delete(`/categories/${data}`),
    getAll: () => axios.get(`/categories`),
    getById: (data) => axios.get(`/categories/${data}`),
};

export default categories;
