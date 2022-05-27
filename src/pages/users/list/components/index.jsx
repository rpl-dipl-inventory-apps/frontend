import CustomTable, {
    DateRangeColumnFilter,
} from 'components/CustomTable';
import Modal from 'components/Modal';
import ModalAction from 'components/ModalAction';
import users from 'constant/api/users';
import { useMemo, useState } from 'react';

const ListUsersContent = (props) => {
    const { data: dataUsers, setEventDelete } = props;

    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
                filterable: true,
                filter: 'fuzzyText',
            },
            {
                Header: 'Name',
                accessor: 'username',
                filterable: true,
                filter: 'fuzzyText',
            },
            {
                Header: 'Email',
                accessor: 'email',
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

    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

    const deleteSelectedUser = async () => {
        const toastId = 'deleteusers';
        try {
            window.showLoader(true);
            await users.delete(selectedUser?.id);
            window.showLoader(false);
            window.showToast(
                toastId,
                'info',
                `success delete users "${selectedUser?.name}"`,
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
            dataUsers.map((item) => ({
                ...item,
                action: (
                    <ModalAction
                        urlEdit={`/users/edit/${item?.id}`}
                        item={item}
                        setSelectedUser={setSelectedUser}
                        setModalDeleteOpen={setIsModalDeleteOpen}
                    />
                ),
            })),
        [dataUsers],
    );

    return (
        <>
            <Modal
                title="Are you sure?"
                label={`Do you really want to delete user "${selectedUser?.name}" ? This process cannot be undone`}
                btnTitle="Delete"
                isOpen={isModalDeleteOpen}
                setIsOpen={setIsModalDeleteOpen}
                action={deleteSelectedUser}
            />
            <CustomTable data={data} columns={columns} />
        </>
    );
};

export default ListUsersContent;
