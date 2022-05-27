import 'react-toastify/dist/ReactToastify.css';

import GlobalLoader from 'components/GlobalLoader';
import GuestRoute from 'components/routers/GuestRoute';
import ProtectedRoute from 'components/routers/ProtectedRoute';
import users from 'constant/api/users';
import history from 'helpers/history';
import { showToast } from 'helpers/toastHelper';
import Account from 'pages/account';
import AddCategory from 'pages/categories/add';
import EditCategory from 'pages/categories/edit';
import ListCategory from 'pages/categories/list';
import Dashboard from 'pages/dashboard/default';
import Home from 'pages/home/default';
import AddItem from 'pages/items/add';
import EditItem from 'pages/items/edit';
import ListItems from 'pages/items/list';
import AddLocation from 'pages/locations/add';
import EditLocation from 'pages/locations/edit';
import ListLocations from 'pages/locations/list';
import Login from 'pages/login/default';
import Logout from 'pages/logout/default';
import ManageStockDefault from 'pages/managestock/default';
import EditStock from 'pages/managestock/editstock';
import NotFound from 'pages/notfound/default';
import Register from 'pages/register/default';
import SelectInventory from 'pages/select-inventory/default';
import ListHistory from 'pages/stockhistory/list';
import AddSupplier from 'pages/suppliers/add';
import ListSupplier from 'pages/suppliers/list';
import ListUsers from 'pages/users/list';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { setLoader, setLoaderIsAuth } from 'store/actions/loader';
import { populateProfile } from 'store/actions/users';

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

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                window.showLoader(true);
                window.setLoaderIsAuth(true);
                const userData = await users.verify();
                dispatch(populateProfile(userData?.data));
                window.showLoader(false);
            } catch (error) {
                window.showLoader(false);
            }
        };
        getUserProfile();
    }, [dispatch]);

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
                    path="/select-inventory"
                    component={SelectInventory}
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
                    path="/categories"
                    component={ListCategory}
                />
                <ProtectedRoute
                    exact
                    path="/categories/add"
                    component={AddCategory}
                />
                <ProtectedRoute
                    exact
                    path="/categories/edit/:id"
                    component={EditCategory}
                />
                <ProtectedRoute
                    exact
                    path="/locations"
                    component={ListLocations}
                />
                <ProtectedRoute
                    exact
                    path="/locations/add"
                    component={AddLocation}
                />
                <ProtectedRoute
                    exact
                    path="/locations/edit/:id"
                    component={EditLocation}
                />
                <ProtectedRoute
                    exact
                    path="/stockhistory"
                    component={ListHistory}
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
                    path="/suppliers"
                    component={ListSupplier}
                />
                <ProtectedRoute
                    exact
                    path="/suppliers/add"
                    component={AddSupplier}
                />
                <ProtectedRoute
                    exact
                    path="/logout"
                    component={Logout}
                />
                <ProtectedRoute
                    exact
                    path="/account"
                    component={Account}
                />
                <ProtectedRoute
                    exact
                    path="/users"
                    component={ListUsers}
                />
                <Route exact path="/" component={Home} />
                <Route path="*" component={NotFound} />
            </Switch>
        </Router>
    );
};

export default App;
