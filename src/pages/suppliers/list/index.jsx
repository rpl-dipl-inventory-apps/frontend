import LayoutBack from 'components/LayoutBack';
import supplier from 'constant/api/supplier';
import { useRef } from 'react';
import { useEffect, useState } from 'react';

import ListSuppliersContent from './components';

const ListSupplier = () => {
    const [data, setData] = useState([]);
    const [eventDelete, setEventDelete] = useState(false);
    const firstRender = useRef(true);

    useEffect(async () => {
        const toastId = 'fetchproducts';
        if (firstRender.current || eventDelete) {
            try {
                window.showLoader(true);
                const res = await supplier.getAll();

                setData(res.data);
                window.showLoader(false);
                firstRender.current = false;
                setEventDelete(false);
            } catch (error) {
                window.showLoader(false);
                window.showToast(
                    toastId,
                    'error',
                    error?.response?.data?.message ?? error?.message,
                );
                firstRender.current = false;
                setEventDelete(false);
            }
        }
    }, [eventDelete]);

    return (
        <LayoutBack
            mainTitle="List Suppliers"
            childTitle="Always check your suppliers everyday!"
        >
            <ListSuppliersContent
                data={data}
                setEventDelete={setEventDelete}
            />
        </LayoutBack>
    );
};

export default ListSupplier;
