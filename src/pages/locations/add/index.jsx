import LayoutBack from 'components/LayoutBack';
import Content from 'pages/locations/add/components';

const AddLocation = () => {
    return (
        <LayoutBack
            mainTitle="Add New Location"
            childTitle="What location do you want to add to inventory?"
            enableBackBtn
            backBtnLink="/locations"
        >
            <Content />
        </LayoutBack>
    );
};

export default AddLocation;
