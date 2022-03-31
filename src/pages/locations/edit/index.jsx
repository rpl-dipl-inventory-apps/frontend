import LayoutBack from 'components/LayoutBack';
import locations from 'constant/api/locations';
import Content from 'pages/locations/edit/components';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const EditLocation = ({ match }) => {
    const [dataFinded, setDataFind] = useState();
    const history = useHistory();

    useEffect(async () => {
        window.showLoader(true);
        const toastId = 'locationsEditdata2';
        try {
            const getData = await locations.getById(match.params.id);
            setDataFind(getData?.data);
            window.showLoader(false);
        } catch (error) {
            window.showLoader(false);
            window.showToast(
                toastId,
                'error',
                error?.response?.data?.message ?? error?.message,
            );
            history.push('/locations');
        }
    }, []);

    return (
        <LayoutBack
            mainTitle="Edit Location"
            childTitle="What location do you want to edit?"
            enableBackBtn
            backBtnLink="/locations"
        >
            <Content data={dataFinded} />
        </LayoutBack>
    );
};

export default EditLocation;
