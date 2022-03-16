import { ReactComponent as Logo } from 'assets/logo-inv-app.svg';
import Hamburger from 'components/Button/Hambuger';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Link as LinkScroll, scroller } from 'react-scroll';

const HeaderFront = ({ match, location }) => {
    const [openNavbar, setOpenNavbar] = useState(false);

    const path = match?.path;
    const isHomepage = (path) => {
        if (path === '/') return 'hover:text-white';
        else return 'hover:text-theme-orange-500';
    };

    const isActive = (path, navPath) =>
        path === navPath
            ? isHomepage(path) === 'hover:text-white'
                ? 'text-white'
                : 'text-theme-orange-500'
            : 'text-gray-700';

    const authentication = useSelector(
        (state) => state.authentication,
    );

    const listNavbar = [
        {
            label: 'Home',
            path: '/',
            isGuest: false,
            needAuth: false,
        },
        {
            label: 'Login',
            path: '/login',
            isGuest: true,
            needAuth: false,
        },
        {
            label: 'About us',
            path: 'about',
            isGuest: false,
            needAuth: false,
        },
        {
            label: 'Dashboard',
            path: '/dashboard',
            isGuest: false,
            needAuth: true,
        },
    ];

    useEffect(() => {
        if (path === '/') {
            const hash = location.hash ?? '#';
            const element = hash.split('#')[1];
            if (element) {
                scroller.scrollTo(element, {
                    duration: 1000,
                    delay: 100,
                    smooth: true,
                });
            }
        }
    }, [path]);

    return (
        <nav className="items-center container mx-auto py-2 relative z-20 flex flex-col lg:flex-row">
            <div className="flex px-2 mx-2 justify-between w-full lg:w-1/2 items-center">
                <Link
                    to="/"
                    className="text-xl font-bold text-gray-800 dark:text-white md:text-2xl hover:text-gray-700 dark:hover:text-gray-300"
                >
                    <Logo />
                </Link>
                <Hamburger
                    color={`${
                        isHomepage(path) === 'hover:text-white'
                            ? 'bg-white'
                            : 'bg-theme-orange-500'
                    }`}
                    isOpen={openNavbar}
                    onClick={() => setOpenNavbar(!openNavbar)}
                />
            </div>
            <div
                className={`px-2 py-5 mx-2  w-full lg:w-1/2  ${
                    openNavbar ? 'block' : 'hidden lg:block'
                }`}
            >
                <ul className="flex flex-col lg:flex-row items-stretch justify-end">
                    {listNavbar
                        .filter((nav) =>
                            authentication.isAuthenticated
                                ? !nav.isGuest || nav.needAuth
                                : !nav.needAuth,
                        )
                        .map((nav, index) => {
                            return (
                                <li
                                    className="py-2 lg:py-0 lg:px-8 flex items-center justify-end "
                                    key={index}
                                >
                                    {nav.path.includes('/') ? (
                                        <Link
                                            to={nav.path}
                                            className={`text-lg underline-transparent ${isHomepage(
                                                path,
                                            )} ${isActive(
                                                path,
                                                nav.path,
                                            )}`}
                                        >
                                            {nav.label}
                                        </Link>
                                    ) : isHomepage(path) ===
                                      'hover:text-white' ? (
                                        <LinkScroll
                                            to={nav.path}
                                            className={`text-lg underline-transparent  ${isHomepage(
                                                path,
                                            )} ${isActive(
                                                path,
                                                nav.path,
                                            )} cursor-pointer`}
                                            smooth={true}
                                        >
                                            {nav.label}
                                        </LinkScroll>
                                    ) : (
                                        <Link
                                            to={`/#${nav.path}`}
                                            className={`text-lg underline-transparent  ${isHomepage(
                                                path,
                                            )} ${isActive(
                                                path,
                                                nav.path,
                                            )} cursor-pointer`}
                                        >
                                            {nav.label}
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                </ul>
            </div>
        </nav>
    );
};

export default withRouter(HeaderFront);
