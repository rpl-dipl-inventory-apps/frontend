import LayoutBack from 'components/LayoutBack';
import products from 'constant/api/products';
import stockhistory from 'constant/api/stockhistory';
import Content from 'pages/dashboard/default/components';
import { useEffect, useState } from 'react';

const Dashboard = () => {
    const [data, setData] = useState(null);

    useEffect(async () => {
        try {
            window.showLoader(true);
            const [resRecent, resTotal, resTotalIn, resTotalOut] =
                await Promise.all([
                    products.getRecent(),
                    products.getTotal(),
                    stockhistory.getTotalIn(),
                    stockhistory.getTotalOut(),
                ]);

            setData({
                recent: resRecent.data,
                total: resTotal.data,
                totalIn: resTotalIn.data,
                totalOut: resTotalOut.data,
            });

            window.showLoader(false);
        } catch (error) {
            window.showLoader(false);
            window.showToast(
                'fetchdashboard',
                'error',
                error?.response?.data?.message ?? error?.message,
            );
        }
    }, []);

    return (
        <LayoutBack
            mainTitle="Dashboard"
            childTitle="Look what you have made today!"
        >
            <Content data={data} />
        </LayoutBack>
    );
};

export default Dashboard;
