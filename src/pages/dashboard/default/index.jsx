import LayoutBack from 'components/LayoutBack';
import Content from 'pages/dashboard/default/components';
import { useEffect, useState } from 'react';

const Dashboard = () => {
    const [data, setData] = useState(null);

    useEffect(async () => {
        setData({
            recent: [],
            total: 0,
            totalIn: 0,
            totalOut: 0,
        });

        window.showLoader(false);
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
