import 'react-toastify/dist/ReactToastify.css';

import GlobalLoader from 'components/GlobalLoader';
import GuestRoute from 'components/routers/GuestRoute';
import history from 'helpers/history';
import Home from 'pages/home/default';
import Login from 'pages/login/default';
import NotFound from 'pages/notfound/default';
import Register from 'pages/register/default';
import { Route, Router, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const App = () => {
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

                <Route exact path="/" component={Home} />
                <Route path="*" component={NotFound} />
            </Switch>
        </Router>
    );
};

export default App;
