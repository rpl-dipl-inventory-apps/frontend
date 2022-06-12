import LayoutBack from 'components/LayoutBack';
import users from 'constant/api/users';
import { useEffect, useState } from 'react';

import ListUsersContent from './components';

const ListUsers = () => {
    const [data, setData] = useState([]);

    useEffect(async () => {
        const toastId = 'fetchusers';
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
        } catch (error) {
            window.showLoader(false);
            window.showToast(
                toastId,
                'error',
                error?.response?.data?.message ?? error?.message,
            );
        }
    }, []);

    return (
        <LayoutBack
            mainTitle="Manage Users"
            childTitle="Manage users in your system"
        >
            <ListUsersContent data={data} />
        </LayoutBack>
    );
};

export default ListUsers;
