import LayoutBack from 'components/LayoutBack';
import categories from 'constant/api/categories';
import Content from 'pages/categories/edit/components';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const EditCategories = ({ match }) => {
    const [dataFinded, setDataFind] = useState();
    const history = useHistory();

    useEffect(async () => {
        window.showLoader(true);
        const toastId = 'cateogiresEditdata';
        try {
            const getData = await categories.getById(match.params.id);
            setDataFind(getData?.data);
            window.showLoader(false);
        } catch (error) {
            window.showLoader(false);
            window.showToast(
                toastId,
                'error',
                error?.response?.data?.message ?? error?.message,
            );
            history.push('/categories');
        }
    }, []);
    return (
        <LayoutBack
            mainTitle="Edit Categories"
            childTitle="What categories do you want to edit?"
            enableBackBtn
            backBtnLink="/categories"
        >
            <Content data={dataFinded} />
        </LayoutBack>
    );
};

export default EditCategories;
