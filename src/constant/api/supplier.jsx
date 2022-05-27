import axios from 'configs/axios';

const supplier = {
    add: (data) => axios.post('/suppliers', data),
    remove: (id) => axios.delete(`/suppliers/${id}`),
    getAll: (supplier = false) =>
        axios.get(`/suppliers?supplier=${supplier}`),
};

export default supplier;
