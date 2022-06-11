/* eslint-disable jsx-a11y/no-onchange */
import CustomTable from 'components/CustomTable';
import Modal from 'components/Modal';
import ModalAction from 'components/ModalAction';
import categories from 'constant/api/categories';
import { useMemo, useRef } from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const ListCategoryContent = () => {
    const history = useHistory();
    const [getData, setData] = useState([]);
    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'increment_id',
                filterable: true,
                filter: 'fuzzyText',
            },
            {
                Header: 'Category Name',
                accessor: 'category_name',
                filterable: true,
                filter: 'fuzzyText',
            },
            {
                Header: 'Created At',
                accessor: 'created_at',
                filterable: false,
            },
            {
                Header: 'Updated At',
                accessor: 'updated_at',
                filterable: false,
            },
            {
                Header: 'Action',
                accessor: 'action',
                filterable: false,
            },
        ],
        [],
    );

    const [eventDelete, setEventDelete] = useState(false);
    const firstRender = useRef(true);
    useEffect(async () => {
        if (firstRender.current || eventDelete) {
            window.showLoader(true);
            try {
                const getAllData = await categories.getAll();
                const mappedData = getAllData.data.map((item) => ({
                    ...item,
                    created_at: new Date(
                        item.created_at,
                    ).toLocaleString(),
                    updated_at: new Date(
                        item.updated_at,
                    ).toLocaleString(),
                }));
                setData(mappedData);
                window.showLoader(false);
            } catch (error) {
                window.showLoader(false);
                window.showToast(
                    'fetchcategory',
                    'error',
                    error?.response?.data?.message ?? error?.message,
                );
            }
        }
    }, [eventDelete]);

    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const deleteSelectedItem = async () => {
        const toastId = 'deleteitemcat';
        try {
            window.showLoader(true);
            await categories.delete(selectedItem?.id);
            window.showLoader(false);
            window.showToast(
                toastId,
                'info',
                `success delete item "${selectedItem?.category_name}"`,
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
            getData?.map((item) => ({
                ...item,
                action: (
                    <ModalAction
                        urlEdit={`/categories/edit/${item.id}`}
                        item={item}
                        setSelectedItem={setSelectedItem}
                        setModalDeleteOpen={setIsModalDeleteOpen}
                    />
                ),
            })),
        [getData],
    );

    return (
        <>
            <Modal
                title="Are you sure?"
                label={`Do you really want to delete category "${selectedItem?.category_name}" ? This process cannot be undone`}
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
                        onClick={() =>
                            history.push('/categories/add')
                        }
                    >
                        Add New Category
                    </button>
                )}
            />
        </>
    );
};

export default ListCategoryContent;
