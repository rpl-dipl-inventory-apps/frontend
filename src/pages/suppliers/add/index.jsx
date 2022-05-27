import LayoutBack from 'components/LayoutBack';

import AddSupplierContent from './components';

const AddSupplier = () => {
    return (
        <LayoutBack
            mainTitle="Add New Supplier"
            childTitle="What supplier do you want to add to inventory?"
            enableBackBtn
            backBtnLink="/suppliers"
        >
            <AddSupplierContent />
        </LayoutBack>
    );
};

export default AddSupplier;
