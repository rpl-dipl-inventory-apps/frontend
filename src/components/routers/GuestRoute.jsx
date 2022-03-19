import { useSelector } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';

const GuestRoute = ({ component: Component, ...rest }) => {
    const authentication = useSelector(
        (state) => state.authentication,
    );
    const loader = useSelector((state) => state.loader);

    const redirectLggedin = localStorage.getItem('redirect');

    if (loader.isAuthenticated) {
        return <div></div>;
    }

    if (!loader.isAuthenticated && authentication.isAuthenticated) {
        return (
            <Redirect
                to={`${redirectLggedin ? redirectLggedin : '/'}`}
            />
        );
    }

    return (
        <>
            {
                <Route
                    {...rest}
                    render={(props) => <Component {...props} />}
                />
            }
        </>
    );
};
export default withRouter(GuestRoute);
