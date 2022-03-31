import axios from 'configs/axios';

const locations = {
    create: (data) => axios.post('/locations', data),
    update: (data) => axios.put(`/locations/${data?.id}`, data),
    delete: (data) => axios.delete(`/locations/${data}`),
    getAll: () => axios.get(`/locations`),
    getById: (data) => axios.get(`/locations/${data}`),
};

export default locations;
