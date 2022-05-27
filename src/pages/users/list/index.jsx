import LayoutBack from 'components/LayoutBack';
import users from 'constant/api/users';
import { useEffect, useState } from 'react';

import ListUsersContent from './components';

const ListUsers = () => {
    const [data, setData] = useState([]);
    const [eventDelete, setEventDelete] = useState(true);

    useEffect(async () => {
        const toastId = 'fetchusers';
        if (eventDelete) {
            try {
                window.showLoader(true);
                const res = await users.getAll();
                const dataMapped = res.data.map((item) => ({
                    ...item,
                    id: item?.id,
                    role: item?.role ?? '',
                    created_at: new Date(
                        item.created_at,
                    ).toLocaleString(),
                }));
                setData(dataMapped);
                window.showLoader(false);
                setEventDelete(false);
            } catch (error) {
                window.showLoader(false);
                window.showToast(
                    toastId,
                    'error',
                    error?.response?.data?.message ?? error?.message,
                );
                setEventDelete(false);
            }
        }
    }, []);

    return (
        <LayoutBack
            mainTitle="Manage Users"
            childTitle="Manage users in your system"
        >
            <ListUsersContent
                data={data}
                setEventDelete={setEventDelete}
            />
        </LayoutBack>
    );
};

export default ListUsers;
