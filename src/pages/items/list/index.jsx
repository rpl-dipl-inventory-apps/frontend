import LayoutBack from 'components/LayoutBack';
import products from 'constant/api/products';
import Content from 'pages/items/list/components';
import { useRef } from 'react';
import { useEffect, useState } from 'react';

const ListItems = () => {
    const [data, setData] = useState([]);
    const [eventDelete, setEventDelete] = useState(false);
    const firstRender = useRef(true);

    useEffect(async () => {
        const toastId = 'fetchproducts';
        if (firstRender.current || eventDelete) {
            try {
                window.showLoader(true);
                const res = await products.getAll();
                const dataMapped = res.data.map((item) => ({
                    ...item,
                    category: item?.category_name ?? '',
                    location: [
                        ...new Set(
                            item?.stock_list?.map(
                                (stock) => stock?.location_name,
                            ),
                        ),
                    ].join(', '),
                    created_at: new Date(
                        item.created_at,
                    ).toLocaleString(),
                }));
                setData(dataMapped);
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
            mainTitle="List Items "
            childTitle="Always check your items everyday!"
        >
            <Content data={data} setEventDelete={setEventDelete} />
        </LayoutBack>
    );
};

export default ListItems;
