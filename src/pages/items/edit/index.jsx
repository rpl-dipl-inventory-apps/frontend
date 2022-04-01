import LayoutBack from 'components/LayoutBack';
import products from 'constant/api/products';
import Content from 'pages/items/edit/components';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const EditItem = ({ match }) => {
    const [data, setData] = useState(null);
    const history = useHistory();
    useEffect(async () => {
        const toastId = 'fetchprodbyid';
        try {
            window.showLoader(true);
            const res = await products.getById(match.params.id);

            const mappedData = {
                ...res?.data,
                category: {
                    id: res?.data?.category_id,
                    category_name: res?.data?.category_name,
                },
                stock_list: res?.data?.stock_list?.map((item) => ({
                    ...item,
                    location: {
                        id: item.location_id,
                        location_name: item.location_name,
                    },
                })),
            };
            setData(mappedData);
            window.showLoader(false);
        } catch (error) {
            window.showLoader(false);
            window.showToast(
                toastId,
                'error',
                error?.response?.data?.message ?? error?.message,
            );
            history.push('/items');
        }
    }, []);

    return (
        <LayoutBack
            mainTitle="Edit Product"
            childTitle="What product do you want to edit?"
            enableBackBtn
            backBtnLink="/items"
        >
            <Content data={data} />
        </LayoutBack>
    );
};

export default EditItem;
