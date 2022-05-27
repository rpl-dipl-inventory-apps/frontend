import useQuery from 'components/hooks/useQuery';
import LayoutBack from 'components/LayoutBack';
import Content from 'pages/managestock/default/components';
import { useSelector } from 'react-redux';

const ManageStockDefault = () => {
    const query = useQuery();

    const user = useSelector((state) => state.users);
    const isSupplier = user?.role === 'supplier';
    const inventoryId = query.get('inventory');
    const inventoryName = localStorage.getItem('inventory_name');

    return (
        <LayoutBack
            mainTitle={`Manage Stock ${
                isSupplier && inventoryName
                    ? `in inventory ${inventoryName}`
                    : ''
            }`}
            childTitle="Manage the amount of your items easily and quickly"
        >
            {isSupplier ? (
                inventoryId ? (
                    <Content inventoryId={inventoryId} />
                ) : (
                    <p className="text-red-500">
                        You have not selected inventory
                    </p>
                )
            ) : (
                <Content />
            )}
        </LayoutBack>
    );
};

export default ManageStockDefault;
