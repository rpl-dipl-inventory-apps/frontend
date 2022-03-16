import { ReactComponent as BgHome } from 'assets/bg_home.svg';
import homeIconPng from 'assets/home_icon.png';
import Button from 'components/Button';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Link as LinkScroll } from 'react-scroll';

const Hero = () => {
    const authentication = useSelector(
        (state) => state.authentication,
    );
    return (
        <div className="container mx-auto flex px-4 w-full flex-col md:flex-row">
            <div
                className="w-full md:w-1/2 flex justify-center flex-col relative z-10"
                style={{ height: '50vh' }}
            >
                <div className="text-white text-3xl font-bold py-2.5">
                    INVENTORY APPLICATION
                </div>
                <div className="bg-white h-1 w-24"></div>
                <div className="text-white py-2.5 text-2xl">
                    List your items with our <br />
                    Professinal Services
                </div>
                <div className="w-full">
                    <div className="w-full md:w-3/4 lg:w-3/5 xl:w-1/3 ">
                        {authentication.isAuthenticated ? (
                            <LinkScroll
                                className="w-full"
                                to="about"
                                smooth={true}
                            >
                                <Button
                                    color="home"
                                    label="About Us"
                                ></Button>
                            </LinkScroll>
                        ) : (
                            <Link className="w-full" to="/register">
                                <Button
                                    color="home"
                                    label="Sign Up"
                                ></Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/2 relative z-10 flex justify-center items-center transform">
                <img
                    className="object-cover overflow-hidden max-w-full h-auto"
                    src={homeIconPng}
                    alt="Home icon"
                />
            </div>
            <div className="absolute top-0 right-0 z-0">
                <BgHome className="flip-image" />
            </div>
        </div>
    );
};

export default Hero;
