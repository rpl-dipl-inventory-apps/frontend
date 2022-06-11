/* eslint-disable jsx-a11y/no-onchange */

import CustomTable, {
    DateRangeColumnFilter,
} from 'components/CustomTable';
import Modal from 'components/Modal';
import ModalAction from 'components/ModalAction';
import products from 'constant/api/products';
import formatRupiah from 'helpers/formatRupiah';
import { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

const ListItemsContent = ({ data: dataProducts, setEventDelete }) => {
    const history = useHistory();

    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'increment_id',
                filterable: true,
                filter: 'fuzzyText',
            },
            {
                Header: 'Name',
                accessor: 'product_name',
                filterable: true,
                filter: 'fuzzyText',
            },
            {
                Header: 'SKU',
                accessor: 'sku',
                filterable: true,
                filter: 'fuzzyText',
            },
            {
                Header: 'Price',
                accessor: 'price',
                filterable: false,
            },
            {
                Header: 'Location',
                accessor: 'location',
                filterable: true,
                filter: 'fuzzyText',
            },
            {
                Header: 'Category',
                accessor: 'category',
                filterable: true,
                filter: 'fuzzyText',
            },
            {
                Header: 'Stock',
                accessor: 'stock',
                filterable: true,
                filter: 'fuzzyText',
            },
            {
                Header: 'Created At',
                accessor: 'created_at',
                filterable: true,
                filter: 'dateBetween',
                Filter: DateRangeColumnFilter,
            },
            {
                Header: 'Action',
                accessor: 'action',
                filterable: false,
            },
        ],
        [],
    );

    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

    const deleteSelectedItem = async () => {
        const toastId = 'deleteitem';
        try {
            window.showLoader(true);
            await products.delete(selectedItem?.id);
            window.showLoader(false);
            window.showToast(
                toastId,
                'info',
                `success delete item "${selectedItem?.product_name}"`,
            );
            setEventDelete(true);
        } catch (error) {
            window.showLoader(false);
            window.showToast(
                toastId,
                'error',
                error?.response?.data?.message ?? error?.message,
            );
        }
    };

    const data = useMemo(
        () =>
            dataProducts.map((item) => ({
                ...item,
                price: formatRupiah(item.price),
                action: (
                    <ModalAction
                        urlEdit={`/items/edit/${item?.id}`}
                        item={item}
                        setSelectedItem={setSelectedItem}
                        setModalDeleteOpen={setIsModalDeleteOpen}
                    />
                ),
            })),
        [dataProducts],
    );

    return (
        <>
            <Modal
                title="Are you sure?"
                label={`Do you really want to delete item "${selectedItem?.product_name}" ? This process cannot be undone`}
                btnTitle="Delete"
                isOpen={isModalDeleteOpen}
                setIsOpen={setIsModalDeleteOpen}
                action={deleteSelectedItem}
            />
            <CustomTable
                data={data}
                columns={columns}
                AddButton={() => (
                    <button
                        type="button"
                        className="bg-theme-brown-300 focus:outline-none px-8 py-3 rounded-md"
                        onClick={() => history.push('/items/add')}
                    >
                        Add New Item
                    </button>
                )}
            />
        </>
    );
};

export default ListItemsContent;
