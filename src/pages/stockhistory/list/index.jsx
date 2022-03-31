import LayoutBack from 'components/LayoutBack';
import stockhistory from 'constant/api/stockhistory';
import Content from 'pages/stockhistory/list/components';
import { useEffect, useState } from 'react';

const ListHistory = () => {
    const [data, setData] = useState([]);
    useEffect(async () => {
        const toastId = 'fetchhistory';
        try {
            window.showLoader(true);
            const res = await stockhistory.getAll();
            const dataMapped = res.data.map((item) => ({
                ...item,
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
            mainTitle="List History of Stock Items"
            childTitle="Always check your items everyday!"
        >
            <Content data={data} />
        </LayoutBack>
    );
};

export default ListHistory;
