/* eslint-disable jsx-a11y/no-onchange */

import CustomTable, {
    DateRangeColumnFilter,
} from 'components/CustomTable';
import Modal from 'components/Modal';
import ModalAction from 'components/ModalAction';
import supplier from 'constant/api/supplier';
import { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

const ListSuppliersContent = ({
    data: dataSuppliers,
    setEventDelete,
}) => {
    const history = useHistory();

    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
                filterable: true,
                filter: 'fuzzyText',
            },
            {
                Header: 'Email',
                accessor: 'supplier_email',
                filterable: true,
                filter: 'fuzzyText',
            },
            {
                Header: 'Username',
                accessor: 'supplier_username',
                filterable: true,
                filter: 'fuzzyText',
            },
            {
                Header: 'Added At',
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
            await supplier.remove(selectedItem?.id);
            window.showLoader(false);
            window.showToast(
                toastId,
                'info',
                `success remove supplier "${selectedItem?.supplier_username}"`,
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
            dataSuppliers.map((item) => ({
                ...item,

                action: (
                    <ModalAction
                        disableEdit={true}
                        item={item}
                        setSelectedItem={setSelectedItem}
                        setModalDeleteOpen={setIsModalDeleteOpen}
                    />
                ),
            })),
        [dataSuppliers],
    );

    return (
        <>
            <Modal
                title="Are you sure?"
                label={`Do you really want to remove "${selectedItem?.supplier_username}" ? This process cannot be undone`}
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
                        onClick={() => history.push('/suppliers/add')}
                    >
                        Add New Supplier
                    </button>
                )}
            />
        </>
    );
};

export default ListSuppliersContent;
