import LayoutBack from 'components/LayoutBack';
import Content from 'pages/items/list/components';
import { useEffect, useState } from 'react';

const ListItems = () => {
    const [data, setData] = useState([]);
    const [eventDelete, setEventDelete] = useState(false);
    useEffect(async () => {
        setData([]);
    }, [eventDelete]);
    return (
        <LayoutBack
            mainTitle="List Items"
            childTitle="Always check your items everyday!"
        >
            <Content data={data} setEventDelete={setEventDelete} />
        </LayoutBack>
    );
};

export default ListItems;
