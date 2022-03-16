import './index.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'virtual:windi.css';

import App from 'App';
import { AnimatePresence } from 'framer-motion';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from 'store';

ReactDOM.render(
    <StrictMode>
        <Provider store={store}>
            <AnimatePresence>
                <App />
            </AnimatePresence>
        </Provider>
    </StrictMode>,
    document.getElementById('root'),
);
