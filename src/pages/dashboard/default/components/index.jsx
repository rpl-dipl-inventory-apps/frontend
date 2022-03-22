import Info from 'pages/dashboard/default/components/Info';
import Recent from 'pages/dashboard/default/components/Recent';

const DasboardConent = ({ data }) => {
    return (
        <>
            <Info data={data} />
            <Recent data={data?.recent} />
        </>
    );
};

export default DasboardConent;
