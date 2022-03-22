import LayoutBack from 'components/LayoutBack';
import Content from 'pages/items/add/components';

const AddItem = () => {
    return (
        <LayoutBack
            mainTitle="Add New Product"
            childTitle="What product do you want to add to inventory?"
            enableBackBtn
            backBtnLink="/items"
        >
            <Content />
        </LayoutBack>
    );
};

export default AddItem;
