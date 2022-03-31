import CustomTable, {
    DateRangeColumnFilter,
} from 'components/CustomTable';
import { useMemo } from 'react';

const StockHistoryContent = ({ data: dataHistory }) => {
    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
                filterable: true,
                filter: 'fuzzyText',
            },
            {
                Header: 'Product Name',
                accessor: 'product_name',
                filterable: true,
                filter: 'fuzzyText',
            },
            {
                Header: 'Type',
                accessor: 'type',
                filterable: false,
                // filter: 'fuzzyText',
            },
            {
                Header: 'Quantity',
                accessor: 'quantity',
                filterable: false,
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

    const data = useMemo(() => dataHistory, [dataHistory]);

    return (
        <CustomTable
            data={data}
            columns={columns}
            defaultColumnSort="created_at"
            defaultDesc={true}
        />
    );
};

export default StockHistoryContent;
