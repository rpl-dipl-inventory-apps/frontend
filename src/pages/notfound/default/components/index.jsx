import notfoundImg from 'assets/404.png';
import Button from 'components/Button';
import { Link } from 'react-router-dom';

const Content = () => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="w-full h-full flex  justify-center items-center">
                <img
                    src={notfoundImg}
                    className="w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6"
                    alt="404"
                />
            </div>
            <div className="w-1/6">
                <Link to="/">
                    <Button color="primary" label="Back to Home" />
                </Link>
            </div>
        </div>
    );
};

export default Content;
