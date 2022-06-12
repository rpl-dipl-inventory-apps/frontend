import CustomTable, {
    DateRangeColumnFilter,
} from 'components/CustomTable';
import { useMemo } from 'react';

const ListUsersContent = (props) => {
    const { data: dataUsers } = props;

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
        ],
        [],
    );

    const data = useMemo(
        () =>
            dataUsers.map((item) => ({
                ...item,
            })),
        [dataUsers],
    );

    return (
        <>
            <CustomTable data={data} columns={columns} />
        </>
    );
};

export default ListUsersContent;
