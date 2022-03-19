import { toast } from 'react-toastify';

export const showToast = (id, type, message) => {
    if (!toast.isActive(id)) {
        if (type === 'info') {
            toast(message, {
                position: toast.POSITION.TOP_CENTER,
                toastId: id,
            });
            return;
        }
        if (type === 'error') {
            toast.error(message, {
                position: toast.POSITION.TOP_CENTER,
                toastId: id,
            });
            return;
        }
    }
};
