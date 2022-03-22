import 'react-toastify/dist/ReactToastify.css';

import GlobalLoader from 'components/GlobalLoader';
import GuestRoute from 'components/routers/GuestRoute';
import ProtectedRoute from 'components/routers/ProtectedRoute';
import history from 'helpers/history';
import { showToast } from 'helpers/toastHelper';
import Dashboard from 'pages/dashboard/default';
import Home from 'pages/home/default';
import AddItem from 'pages/items/add';
import EditItem from 'pages/items/edit';
import ListItems from 'pages/items/list';
import Login from 'pages/login/default';
import Logout from 'pages/logout/default';
import ManageStockDefault from 'pages/managestock/default';
import EditStock from 'pages/managestock/editstock';
import NotFound from 'pages/notfound/default';
import Register from 'pages/register/default';
import { useDispatch } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { setLoader, setLoaderIsAuth } from 'store/actions/loader';

const App = () => {
    const dispatch = useDispatch();

    const showLoader = (show) => {
        dispatch(setLoader(show));
    };
    const setLoaderIsAuthForWindow = (isAuth) => {
        dispatch(setLoaderIsAuth(isAuth));
    };

    window.showToast = showToast;
    window.showLoader = showLoader;
    window.setLoaderIsAuth = setLoaderIsAuthForWindow;

    return (
        <Router history={history}>
            <GlobalLoader />
            <ToastContainer />
            <Switch>
                <GuestRoute exact path="/login" component={Login} />
                <GuestRoute
                    exact
                    path="/register"
                    component={Register}
                />
                <ProtectedRoute
                    exact
                    path="/dashboard"
                    component={Dashboard}
                />
                <ProtectedRoute
                    exact
                    path="/dashboard"
                    component={Dashboard}
                />
                <ProtectedRoute
                    exact
                    path="/managestock"
                    component={ManageStockDefault}
                />
                <ProtectedRoute
                    exact
                    path="/managestock/edit"
                    component={EditStock}
                />
                <ProtectedRoute
                    exact
                    path="/items"
                    component={ListItems}
                />
                <ProtectedRoute
                    exact
                    path="/items/add"
                    component={AddItem}
                />
                <ProtectedRoute
                    exact
                    path="/items/edit/:id"
                    component={EditItem}
                />
                <ProtectedRoute
                    exact
                    path="/logout"
                    component={Logout}
                />

                <Route exact path="/" component={Home} />
                <Route path="*" component={NotFound} />
            </Switch>
        </Router>
    );
};

export default App;
