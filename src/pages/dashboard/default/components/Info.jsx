import { useMemo } from 'react';

const Info = ({ data }) => {
    const info = useMemo(
        () => ({
            total_items: data?.total ?? 0,
            total_items_in: data?.totalIn ?? 0,
            total_items_out: data?.totalOut ?? 0,
        }),
        [data],
    );

    return (
        <div className="flex flex-col md:flex-row py-5 justify-between">
            <div className="w-full md:w-1/3 lg:1/4 bg-theme-brown-300 my-2 md:my-0 md:mr-5 rounded-lg p-5 lg:p-8">
                <div>
                    <p>Total Items</p>
                </div>

                <div className="text-4xl py-4 font-semibold">
                    {info.total_items}
                </div>
            </div>
            <div className="w-full md:w-1/3 lg:1/4 bg-theme-brown-300 my-2 md:my-0 md:mx-5 rounded-lg p-5 lg:p-8">
                <div>
                    <p>Total Items Qty In</p>
                </div>
                <div className="text-4xl py-4 font-semibold">
                    {info.total_items_in}
                </div>
            </div>
            <div className="w-full md:w-1/3 lg:1/4 bg-theme-brown-300 my-2 md:my-0 md:ml-5 rounded-lg p-5 lg:p-8">
                <div>
                    <p>Total Items Qty out</p>
                </div>
                <div className="text-4xl py-4 font-semibold">
                    {info.total_items_out}
                </div>
            </div>
        </div>
    );
};

export default Info;
