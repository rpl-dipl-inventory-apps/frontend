import axios from 'axios';
import errorHandler from 'configs/axios/errorHandler';
import store from 'store';

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_API_URL}`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.response.use(
    (response) => response.data,
    errorHandler,
);

instance.interceptors.request.use((config) => {
    const state = store.getState();
    const authentication = state.authentication;
    if (authentication.token) {
        config.headers.Authorization = `Bearer ${authentication.token}`;
    } else {
        delete config.headers.Authorization;
    }
    return config;
});

export default instance;
