import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
    const location = useLocation();

    return useMemo(
        () => new URLSearchParams(location.search),
        [location.search],
    );
};

export default useQuery;
