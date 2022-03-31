/* eslint-disable jsx-a11y/no-onchange */
import CustomTable from 'components/CustomTable';
import Modal from 'components/Modal';
import ModalAction from 'components/ModalAction';
import locations from 'constant/api/locations';
import { useMemo, useRef } from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const ListLocationsContent = () => {
    const history = useHistory();
    const [locationData, setLocData] = useState([]);
    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
                filterable: true,
                filter: 'fuzzyText',
            },
            {
                Header: 'Location Name',
                accessor: 'location_name',
                filterable: true,
                filter: 'fuzzyText',
            },
            {
                Header: 'Location Code',
                accessor: 'location_code',
                filterable: true,
                filter: 'fuzzyText',
            },
            {
                Header: 'Created At',
                accessor: 'created_at',
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
                const getAllData = await locations.getAll();
                const mappedData = getAllData.data.map((item) => ({
                    ...item,
                    created_at: new Date(
                        item.created_at,
                    ).toLocaleString(),
                }));
                setLocData(mappedData);
                window.showLoader(false);
            } catch (error) {
                window.showLoader(false);
                window.showToast(
                    'fetchloc',
                    'error',
                    error?.response?.data?.message ?? error?.message,
                );
            }
        }
    }, [eventDelete]);

    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

    const deleteSelectedItem = async () => {
        const toastId = 'deleteitemloc';
        try {
            window.showLoader(true);
            await locations.delete(selectedItem?.id);
            window.showLoader(false);
            window.showToast(
                toastId,
                'info',
                `success delete item "${selectedItem?.location_name}"`,
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
            locationData?.map((item) => ({
                ...item,
                action: (
                    <ModalAction
                        urlEdit={`/locations/edit/${item.id}`}
                        item={item}
                        setSelectedItem={setSelectedItem}
                        setModalDeleteOpen={setIsModalDeleteOpen}
                    />
                ),
            })),
        [locationData],
    );

    return (
        <>
            <Modal
                title="Are you sure?"
                label={`Do you really want to delete location "${selectedItem?.location_name}" ? This process cannot be undone`}
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
                        onClick={() => history.push('/locations/add')}
                    >
                        Add New Location
                    </button>
                )}
            />
        </>
    );
};

export default ListLocationsContent;
