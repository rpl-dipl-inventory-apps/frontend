import LayoutBack from 'components/LayoutBack';
import Content from 'pages/managestock/editstock/components';
import { useMemo } from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const EditStock = () => {
    const location = useLocation();
    const history = useHistory();
    const query = useMemo(
        () => new URLSearchParams(location.search),
        [location.search],
    );

    const [type, setType] = useState('');

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
        window.showLoader(true);
        setData([]);
        window.showLoader(false);
    }, []);

    return (
        <LayoutBack
            mainTitle={`${type} Your Product Stock`}
            childTitle={`What product do you want to ${type.toLowerCase()} stock?`}
            enableBackBtn
            backBtnLink="/managestock"
        >
            <Content data={data} type={type} />
        </LayoutBack>
    );
};

export default EditStock;
