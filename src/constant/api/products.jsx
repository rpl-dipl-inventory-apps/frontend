import axios from 'configs/axios';

const products = {
    create: (data) => axios.post('/products', data),
    getAll: (inventoryid = null) =>
        axios.get('/products', {
            params: {
                inventoryid,
            },
        }),
    getById: (id, inventoryid = null) =>
        axios.get(`/products/${id}`, {
            params: {
                inventoryid,
            },
        }),
    update: (id, data, inventoryid = null) =>
        axios.put(`/products/${id}`, data, {
            params: {
                inventoryid,
            },
        }),
    delete: (id) => axios.delete(`/products/${id}`),
    getRecent: () => axios.get('/products/recent'),
    getTotal: () => axios.get('/products/total'),
    reduceStock: (id, data, inventoryid = null) =>
        axios.put(`/products/${id}/stock/reduce`, data, {
            params: {
                inventoryid,
            },
        }),
};

export default products;
