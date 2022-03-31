import axios from 'configs/axios';

const stockhistory = {
    getAll: () => axios.get('/stockhistory'),
    getTotalIn: () => axios.get('/stockhistory/in'),
    getTotalOut: () => axios.get('/stockhistory/out'),
};

export default stockhistory;
