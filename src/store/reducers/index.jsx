import { combineReducers } from 'redux';
import { authentication } from 'store/reducers/authentication';
import { loader } from 'store/reducers/loader';
import { users } from 'store/reducers/users';

export default combineReducers({
    loader,
    authentication,
    users,
});
