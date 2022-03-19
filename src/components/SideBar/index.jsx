import { ReactComponent as ArrowLeft } from 'assets/arrow-left.svg';
import { ReactComponent as ArrowRight } from 'assets/arrow-right.svg';
import { ReactComponent as Logo } from 'assets/logo-inv-app.svg';
import { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

const SideBar = ({ match }) => {
    const path = match?.path;

    const isActive = (path, navPath) => {
        const existPath = path
            .split('/')
            .filter((item) => `/${item}` === navPath);
        const activePath =
            existPath.length > 0 ? `/${existPath[0]}` : path;

        return activePath === navPath
            ? 'border-r-3 border-red-500 sidebar-active-bg'
            : '';
    };

    const [sideBarOpen, setSideBarOpen] = useState(false);

    const listNav = [
        {
            label: 'Dashboard',
            path: '/dashboard',
        },
        {
            label: 'Manage Stock',
            path: '/managestock',
        },
        {
            label: 'List Items',
            path: '/items',
        },
        {
            label: 'List Category',
            path: '/categories',
        },
        {
            label: 'List Location',
            path: '/locations',
        },
        {
            label: 'History of Stock',
            path: '/stockhistory',
        },
        {
            label: 'My Account',
            path: '/account',
        },
        {
            label: 'Logout',
            path: '/logout',
        },
    ];

    return (
        <>
            <div
                className={`bg-theme-brown-300 w-64 space-y-6 py-7 fixed inset-y-0 left-0 transform  2xl:translate-x-0 transition-all duration-500 z-40 ${
                    sideBarOpen
                        ? 'translate-x-0'
                        : '-translate-x-full'
                }`}
            >
                <div
                    className={`z-50 absolute 2xl:hidden my-16 ${
                        sideBarOpen ? '-right-6' : '-right-6'
                    } `}
                >
                    <button
                        className="focus:outline-none "
                        onClick={() => setSideBarOpen(!sideBarOpen)}
                    >
                        {sideBarOpen ? (
                            <div className="bg-gray-200 flex justify-center items-center rounded-r-md p-1">
                                <ArrowLeft width="20" />
                            </div>
                        ) : (
                            <div className="bg-gray-200 flex justify-center items-center rounded-r-md p-1">
                                <ArrowRight width="20" />
                            </div>
                        )}
                    </button>
                </div>

                <div className="flex px-2 mx-2 justify-center w-full items-center h-1/6">
                    <Link
                        to="/"
                        className="text-xl font-bold text-gray-800 dark:text-white md:text-2xl hover:text-gray-700 dark:hover:text-gray-300"
                    >
                        <Logo width="90" height="90" />
                    </Link>
                </div>
                <div className="flex px-2 mx-2 justify-center w-full items-center">
                    <ul className="flex flex-col w-full">
                        {listNav.map((item, index) => (
                            <li
                                key={index}
                                className={`my-3 py-1 w-full hover:border-r-3 hover:border-red-500 hover:sidebar-active-bg ${isActive(
                                    path,
                                    item.path,
                                )} `}
                            >
                                <div className="pl-10 ">
                                    <Link
                                        to={item.path}
                                        className="text-lg underline-transparent text-black"
                                    >
                                        {item.label}
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex px-2 py-10 mx-2 justify-center w-full items-center bottom-0 absolute">
                    <Link
                        to="/"
                        className="text-lg underline-transparent text-black"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </>
    );
};

export default withRouter(SideBar);
