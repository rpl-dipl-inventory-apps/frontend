import LayoutBack from 'components/LayoutBack';
import Content from 'pages/items/edit/components';
import { useState } from 'react';

const EditItem = () => {
    const [data, setData] = useState(null);
    setData([]);

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
