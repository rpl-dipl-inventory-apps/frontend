import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setAuthenticationToken } from 'store/actions/authentication';
import { populateProfile } from 'store/actions/users';

const Logout = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(async () => {
        window.showLoader(true);
        dispatch(setAuthenticationToken(null));
        dispatch(populateProfile(null));
        window.showLoader(false);
        localStorage.removeItem('inventory');
        localStorage.removeItem('inventory_name');
        history.push('/');
    }, []);

    return null;
};

export default Logout;
