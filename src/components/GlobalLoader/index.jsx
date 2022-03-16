import Loader from 'react-loader-spinner';
import { useSelector } from 'react-redux';

const GlobalLoader = ({ isActive }) => {
    const loader = useSelector((state) => state.loader);

    if (loader.isActive || isActive) {
        return (
            <div className="fixed flex items-center justify-center w-full h-full bg-gray-400 z-30 bg-opacity-50">
                <Loader
                    type="MutatingDots"
                    color="#ED6F00"
                    secondaryColor="#FFFFFF"
                    height={100}
                    width={100}
                />
            </div>
        );
    }
    return '';
};

export default GlobalLoader;
