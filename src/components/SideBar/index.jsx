import { ReactComponent as ArrowLeft } from 'assets/arrow-left.svg';
import { ReactComponent as ArrowRight } from 'assets/arrow-right.svg';
import { ReactComponent as Logo } from 'assets/logo-inv-app.svg';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory, withRouter } from 'react-router-dom';

const SideBar = ({ match }) => {
    const path = match?.path;
    const history = useHistory();

    const isActive = (currentPath, navPath) => {
        const existPath = currentPath
            .split('/')
            .filter((item) => `/${item}` === navPath);
        const activePath =
            existPath.length > 0 && existPath[0] !== ''
                ? `/${existPath[0]}`
                : currentPath;

        return activePath === navPath
            ? 'border-r-3 border-red-500 sidebar-active-bg'
            : '';
    };

    const [sideBarOpen, setSideBarOpen] = useState(false);

    const user = useSelector((state) => state.users);
    const inventoryId = localStorage.getItem('inventory');
    const isSupplier = user?.role === 'supplier';

    const listNav = [
        {
            label: 'Dashboard',
            path: '/dashboard',
            roles: ['default', 'admin'],
        },
        {
            label: 'Select Inventory',
            path: `${
                isSupplier && inventoryId
                    ? `/select-inventory?inventory=${inventoryId}`
                    : '/select-inventory'
            }`,
            roles: ['supplier'],
        },
        {
            label: 'Manage Stock',
            path: `${
                isSupplier && inventoryId
                    ? `/managestock?inventory=${inventoryId}`
                    : '/managestock'
            }`,
            roles: ['default', 'admin', 'supplier'],
        },
        {
            label: 'List Items',
            path: '/items',
            roles: ['default', 'admin'],
        },
        {
            label: 'List Category',
            path: '/categories',
            roles: ['default', 'admin'],
        },
        {
            label: 'List Location',
            path: '/locations',
            roles: ['default', 'admin'],
        },
        {
            label: 'History of Stock',
            path: '/stockhistory',
            roles: ['default', 'admin'],
        },
        {
            label: 'Suppliers',
            path: '/suppliers',
            roles: ['default', 'admin'],
        },
        {
            label: 'My Account',
            path: '/account',
            roles: ['default', 'admin', 'supplier'],
        },
        {
            label: 'Manage Users',
            path: '/users',
            roles: ['admin'],
        },
        {
            label: 'Logout',
            path: '/logout',
            roles: ['default', 'admin', 'supplier'],
        },
        {
            label: 'Back to Home',
            path: '/',
            roles: ['default', 'admin', 'supplier'],
        },
    ];

    useEffect(() => {
        const currentNav = listNav.find((nav) => nav.path === path);
        if (currentNav && !currentNav.roles.includes(user.role)) {
            if (currentNav.path === '/dashboard') {
                history.push('/select-inventory');
                return;
            }
            history.push('/404');
        }
    }, []);

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
                    <ul className="flex flex-col w-full overflow-y-auto h-140 sidebar-scroll">
                        {listNav
                            .filter(
                                (item) =>
                                    item.roles.findIndex((role) =>
                                        role.includes(user.role),
                                    ) > -1,
                            )
                            .map((item, index) => (
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
            </div>
        </>
    );
};

export default withRouter(SideBar);
