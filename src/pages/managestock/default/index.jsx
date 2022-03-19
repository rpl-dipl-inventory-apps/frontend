import LayoutBack from 'components/LayoutBack';
import Content from 'pages/managestock/default/components';

const ManageStockDefault = () => {
    return (
        <LayoutBack
            mainTitle="Manage Stock"
            childTitle="Manage the amount of your items easily and quickly"
        >
            <Content />
        </LayoutBack>
    );
};

export default ManageStockDefault;
