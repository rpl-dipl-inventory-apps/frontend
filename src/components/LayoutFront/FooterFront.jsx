import { withRouter } from 'react-router-dom';

const Footer = () => {
    return (
        <footer
            className={`mx-auto flex items-center justify-center mt-7  border-t border-gray-300 h-16 text-gray-400 z-0}`}
        >
            {new Date().getFullYear()} Copyright Store. All Rights
            Reserved.
        </footer>
    );
};

export default withRouter(Footer);
