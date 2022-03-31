import axios from 'axios';

const { VITE_IMGUR_UPLOAD_URL, VITE_IMGUR_CLIENT_ID } = import.meta
    .env;

const imgur = {
    upload: (binary) => {
        const formData = new FormData();
        formData.append('image', binary);

        return axios.post(VITE_IMGUR_UPLOAD_URL, formData, {
            headers: {
                Authorization: `Client-ID ${VITE_IMGUR_CLIENT_ID}`,
            },
            redirect: 'follow',
        });
    },
};

export default imgur;
