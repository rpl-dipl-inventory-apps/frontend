import LayoutBack from 'components/LayoutBack';
import Content from 'pages/locations/list/components';

const ListLocations = () => {
    return (
        <LayoutBack
            mainTitle="List Location"
            childTitle="Always check your items everyday!"
        >
            <Content />
        </LayoutBack>
    );
};

export default ListLocations;
