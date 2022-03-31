import LayoutBack from 'components/LayoutBack';
import Content from 'pages/categories/add/components';

const AddCategory = () => {
    return (
        <LayoutBack
            mainTitle="Add New Location"
            childTitle="What location do you want to add to inventory?"
            enableBackBtn
            backBtnLink="/categories"
        >
            <Content />
        </LayoutBack>
    );
};

export default AddCategory;
