/* eslint-disable jsx-a11y/no-onchange */
import Input from 'components/Input';
import { matchSorter } from 'match-sorter';
import { useMemo, useState } from 'react';
import {
    useFilters,
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from 'react-table';

const getVisiblePages = (currentPage, total, gotoPage) => {
    const prefix = '.....';
    let arr = [];
    if (total < 7) {
        arr = [...Array(total).keys()].map((val) => val + 1);
    } else {
        if (
            currentPage % 5 >= 0 &&
            currentPage > 4 &&
            currentPage + 2 < total
        ) {
            arr = [
                1,
                prefix,
                currentPage - 1,
                currentPage,
                currentPage + 1,
                prefix,
                total,
            ];
        } else if (
            currentPage % 5 >= 0 &&
            currentPage > 4 &&
            currentPage + 2 >= total
        ) {
            arr = [1, prefix, total - 3, total - 2, total - 1, total];
        } else {
            arr = [1, 2, 3, 4, 5, prefix, total];
        }
    }

    return arr.map((val) => {
        if (val !== prefix) {
            return (
                <button
                    className={`px-3 py-1 rounded-md focus:outline-none  ${
                        val === currentPage && 'bg-theme-brown-300'
                    }`}
                    key={val}
                    type="button"
                    onClick={() => gotoPage(val - 1)}
                >
                    {val}
                </button>
            );
        } else {
            return val;
        }
    });
};

const fuzzyTextFilterFn = (rows, id, filterValue) => {
    return matchSorter(rows, filterValue, {
        keys: [(row) => row.values[id]],
    });
};

fuzzyTextFilterFn.autoRemove = (val) => !val;

export const DefaultColumnFilter = ({
    column: { filterValue, setFilter, Header },
}) => {
    return (
        <Input
            name="default"
            label={Header}
            value={filterValue || ''}
            outline={true}
            inputBg="bg-theme-brown-300"
            onChange={(e) => {
                setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
            }}
        />
    );
};

const dateBetweenFilterFn = (rows, id, filterValues) => {
    let sd = new Date(filterValues[0]);
    let ed = new Date(filterValues[1]);
    return rows.filter((r) => {
        var time = new Date(r.values[id]);
        if (filterValues.length === 0) return rows;
        return time >= sd && time <= ed;
    });
};

dateBetweenFilterFn.autoRemove = (val) => !val;

export const DateRangeColumnFilter = ({
    column: { filterValue = [], setFilter, Header },
}) => {
    const today = new Date();
    return (
        <div className="w-full flex flex-col md:flex-row">
            <div className="px-0 md:pl-0 md:pr-2.5  py-2 md:py-0">
                <Input
                    onChange={(e) => {
                        const val = e.target.value;
                        setFilter((old = []) => [
                            val ? val : undefined,
                            old[1],
                        ]);
                    }}
                    type="date"
                    value={filterValue[0] || ''}
                    outline={true}
                    inputBg="bg-theme-brown-300"
                    label={`${Header} From`}
                    name="from"
                    max={today.toISOString().slice(0, 10)}
                />
            </div>
            <div className="px-0 md:pr-0 md:pl-2.5 py-2 md:py-0">
                <Input
                    label={`${Header} To`}
                    name="to"
                    onChange={(e) => {
                        const val = e.target.value;
                        setFilter((old = []) => [
                            old[0],
                            val
                                ? val.concat('T23:59:59.999Z')
                                : undefined,
                        ]);
                    }}
                    type="date"
                    value={filterValue[1]?.slice(0, 10) || ''}
                    outline={true}
                    inputBg="bg-theme-brown-300"
                    max={today.toISOString().slice(0, 10)}
                />
            </div>
        </div>
    );
};

const CustomTable = (props) => {
    const {
        data,
        columns,
        AddButton,
        defaultColumnSort = 'id',
        defaultDesc = false,
    } = props;
    const [openFilters, setOpenFilters] = useState(false);

    const filterTypes = useMemo(
        () => ({
            // Add a new fuzzyTextFilterFn filter type.
            fuzzyText: fuzzyTextFilterFn,
            dateBetween: dateBetweenFilterFn,
        }),
        [],
    );

    const defaultColumn = useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
            DateRangeColumnFilter: DateRangeColumnFilter,
        }),
        [],
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        setAllFilters,
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: {
                pageSize: 10,
                sortBy: [
                    {
                        desc: defaultDesc,
                        id: defaultColumnSort,
                    },
                ],
            },
            defaultColumn,
            filterTypes,
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,
    );

    return (
        <>
            <div className="flex flex-row justify-between w-full">
                <div className="flex flex-col w-full">
                    <div className="flex flex-row w-full">
                        <div className="flex justify-start w-1/2">
                            {AddButton && <AddButton />}
                        </div>

                        <div className="flex justify-end w-1/2">
                            <button
                                type="button"
                                className="bg-theme-brown-300 focus:outline-none px-8 py-3 rounded-md"
                                onClick={() =>
                                    setOpenFilters(!openFilters)
                                }
                            >
                                Filters
                            </button>
                        </div>
                    </div>
                    <div
                        className={`py-3 my-2 bg-theme-brown-100 px-5 ${
                            !openFilters && 'hidden'
                        } `}
                    >
                        {headerGroups.map(
                            (headerGroup, headerGroupIdx) => (
                                <div
                                    key={headerGroupIdx}
                                    className="flex flex-col md:flex-row flex-wrap"
                                >
                                    {headerGroup.headers.map(
                                        (column, columnIdx) => {
                                            if (
                                                column.canFilter &&
                                                column.filterable
                                            ) {
                                                return (
                                                    <div
                                                        key={
                                                            columnIdx
                                                        }
                                                        className={`px-2.5 py-2 w-full ${
                                                            column?.filter ===
                                                            'dateBetween'
                                                                ? 'md:w-1/2'
                                                                : 'md:w-1/5'
                                                        }`}
                                                    >
                                                        <div className="w-full">
                                                            {column.render(
                                                                'Filter',
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        },
                                    )}
                                </div>
                            ),
                        )}
                        <div className="px-5 py-2">
                            <button
                                type="button"
                                className="bg-theme-brown-300 focus:outline-none px-8 py-3 rounded-md"
                                onClick={() => setAllFilters([])}
                            >
                                Clear Filter
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto overflow-y-hidden">
                <table
                    {...getTableProps()}
                    className="border-separate"
                    style={{
                        borderSpacing: '0px 20px',
                        width: '1550px',
                    }}
                >
                    <thead className="bg-theme-brown-300 h-18 shadow-md ">
                        {headerGroups.map(
                            (headerGroup, headerGroupIdx) => (
                                <tr
                                    {...headerGroup.getHeaderGroupProps()}
                                    key={headerGroupIdx}
                                >
                                    {headerGroup.headers.map(
                                        (column, columnIdx) => (
                                            <th
                                                className={` ${
                                                    columnIdx === 0
                                                        ? 'rounded-l-xl px-3'
                                                        : ''
                                                } ${
                                                    columnIdx ===
                                                    headerGroup
                                                        .headers
                                                        .length -
                                                        1
                                                        ? 'rounded-r-xl'
                                                        : ''
                                                } ${
                                                    column.id ===
                                                        'action' &&
                                                    'text-left'
                                                } `}
                                                key={columnIdx}
                                                {...column.getHeaderProps(
                                                    column.getSortByToggleProps(),
                                                )}
                                            >
                                                {column.render(
                                                    'Header',
                                                )}
                                                <span>
                                                    {column.isSorted
                                                        ? column.isSortedDesc
                                                            ? ' 🠗'
                                                            : ' 🠕'
                                                        : ''}
                                                </span>
                                            </th>
                                        ),
                                    )}
                                </tr>
                            ),
                        )}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.length === 0 ? (
                            <tr>
                                <td>Data Empty</td>
                            </tr>
                        ) : (
                            page.map((row, rowIdx) => {
                                prepareRow(row);
                                return (
                                    <tr
                                        {...row.getRowProps()}
                                        key={rowIdx}
                                        className="bg-theme-brown-100 shadow-md"
                                    >
                                        {row.cells.map(
                                            (cell, cellIdx) => {
                                                return (
                                                    <td
                                                        className={` align-middle py-3 ${
                                                            cellIdx ===
                                                            0
                                                                ? 'rounded-l-xl'
                                                                : ''
                                                        } ${
                                                            cellIdx ===
                                                            row.cells
                                                                .length -
                                                                1
                                                                ? 'rounded-r-xl'
                                                                : ''
                                                        } ${
                                                            cell
                                                                ?.column
                                                                ?.id ===
                                                            'action'
                                                                ? 'text-left'
                                                                : 'text-center'
                                                        }`}
                                                        style={{
                                                            width: `${
                                                                cell
                                                                    ?.column
                                                                    ?.id ===
                                                                'action'
                                                                    ? '10%'
                                                                    : 'auto'
                                                            }`,
                                                        }}
                                                        {...cell.getCellProps()}
                                                        key={cellIdx}
                                                    >
                                                        {cell.render(
                                                            'Cell',
                                                        )}
                                                    </td>
                                                );
                                            },
                                        )}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col md:flex-row justify-between py-3 text-sm md:text-base">
                <div className="flex flex-row items-center py-2 w-full md:w-1/2 justify-center md:justify-start">
                    <div>
                        Showing Page {pageIndex + 1} of{' '}
                        {pageOptions.length} pages
                    </div>

                    <div className="px-2">
                        <select
                            className="focus:outline-none bg-theme-brown-300 px-3 py-2 rounded-md"
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                            }}
                        >
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <option
                                    key={pageSize}
                                    value={pageSize}
                                >
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="py-2 w-full md:w-1/2 flex justify-center md:justify-end items-center">
                    <button
                        className={`focus:outline-none ${
                            !canPreviousPage && 'text-gray-400'
                        }`}
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                    >
                        previous
                    </button>
                    <span className="px-3">
                        {getVisiblePages(
                            pageIndex + 1,
                            pageOptions.length,
                            gotoPage,
                        )}
                    </span>
                    <button
                        className={`focus:outline-none ${
                            !canNextPage && 'text-gray-400'
                        }`}
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                    >
                        next
                    </button>
                </div>
            </div>
        </>
    );
};

export default CustomTable;
