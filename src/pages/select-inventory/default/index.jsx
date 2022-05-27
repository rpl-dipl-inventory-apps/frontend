import LayoutBack from 'components/LayoutBack';
import supplier from 'constant/api/supplier';
import { useEffect, useState } from 'react';

import SelectInventoryContent from './components';

const SelectInventory = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            window.showLoader(true);
            const toastId = 'fetchsupplier';
            try {
                const res = await supplier.getAll(true);
                setData(res.data);
                window.showLoader(false);
            } catch (error) {
                window.showToast(
                    toastId,
                    'error',
                    error?.response?.data?.message ?? error?.message,
                );
                window.showLoader(false);
            }
        };

        fetchData();
    }, []);

    return (
        <LayoutBack
            mainTitle="Select Inventory"
            childTitle="Choose inventory what you want to add to your stock"
        >
            <SelectInventoryContent data={data} />
        </LayoutBack>
    );
};

export default SelectInventory;
