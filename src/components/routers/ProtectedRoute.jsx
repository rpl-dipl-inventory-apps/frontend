import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';

const ProtectedRoute = ({
    component: Component,
    location,
    ...rest
}) => {
    const authentication = useSelector(
        (state) => state.authentication,
    );
    const loader = useSelector((state) => state.loader);

    const redirectLggedin = localStorage.getItem('redirect');
    if (redirectLggedin) {
        localStorage.removeItem('redirect');
    }

    if (loader.isAuthenticated) {
        return <div></div>;
    }

    if (authentication.isAuthenticated) {
        return (
            <Route
                {...rest}
                render={(props) => <Component {...props} />}
            />
        );
    }

    if (location.pathname !== '/logout') {
        localStorage.setItem('redirect', location.pathname);
    }

    return <>{!loader.isActive && <Redirect to={`/login`} />}</>;
};
export default withRouter(ProtectedRoute);
