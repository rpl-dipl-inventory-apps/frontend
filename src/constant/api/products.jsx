import axios from 'configs/axios';

const products = {
    create: (data) => axios.post('/products', data),
    getAll: () => axios.get('/products'),
    getById: (id) => axios.get(`/products/${id}`),
    update: (id, data) => axios.put(`/products/${id}`, data),
    delete: (id) => axios.delete(`/products/${id}`),
    getRecent: () => axios.get('/products/recent'),
    getTotal: () => axios.get('/products/total'),
};

export default products;
