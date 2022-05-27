import useQuery from 'components/hooks/useQuery';
import LayoutBack from 'components/LayoutBack';
import locations from 'constant/api/locations';
import products from 'constant/api/products';
import Content from 'pages/managestock/editstock/components';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

const EditStock = () => {
    const history = useHistory();
    const query = useQuery();

    const [type, setType] = useState('');

    const location = useLocation();
    const user = useSelector((state) => state.users);
    const isSupplier = user?.role === 'supplier';
    const inventoryId = query.get('inventory');
    const inventoryName = localStorage.getItem('inventory_name');

    useEffect(() => {
        if (
            query.get('type') !== 'Add' &&
            query.get('type') !== 'Reduce'
        ) {
            history.push('/managestock');
        }

        if (!query.get('type')) {
            history.push('/managestock');
        }
        if (query.get('type')) {
            setType(query.get('type'));
        }
    }, [query]);

    const [data, setData] = useState(null);
    useEffect(async () => {
        const toastId = 'fetchprodall';
        try {
            window.showLoader(true);
            const dataObj = {};
            const res = await products.getAll(
                isSupplier ? inventoryId : null,
            );
            if (query.get('type') === 'Add') {
                const resLoc = await locations.getAll(
                    isSupplier ? inventoryId : null,
                );
                dataObj.locations = resLoc.data;
            }
            dataObj.products = res.data;
            setData(dataObj);
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
            mainTitle={`${type} Your Product Stock ${
                isSupplier && inventoryName
                    ? `in inventory ${inventoryName}`
                    : ''
            }`}
            childTitle={`What product do you want to ${type.toLowerCase()} stock?`}
            enableBackBtn
            backBtnLink={`/managestock${location.search}`}
        >
            <Content
                data={data}
                type={type}
                inventoryId={inventoryId}
            />
        </LayoutBack>
    );
};

export default EditStock;
