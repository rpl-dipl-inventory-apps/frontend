import 'react-toastify/dist/ReactToastify.css';

import GlobalLoader from 'components/GlobalLoader';
import history from 'helpers/history';
import Home from 'pages/home/default';
import NotFound from 'pages/notfound/default';
import { Route, Router, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const App = () => {
    return (
        <Router history={history}>
            <GlobalLoader />
            <ToastContainer />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="*" component={NotFound} />
            </Switch>
        </Router>
    );
};

export default App;
