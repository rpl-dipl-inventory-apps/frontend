const Hamburger = ({ isOpen, color, className, ...rest }) => {
    const genericHamburgerLine = `h-1 w-8 my-1 rounded-full ${color} transition ease transform duration-300`;

    return (
        <button
            {...rest}
            className={`flex flex-col h-12 w-12 justify-center items-center group opacity-100 lg:opacity-0 transition-all duration-500 focus:outline-none ${className}`}
        >
            <div
                className={`${genericHamburgerLine} ${
                    isOpen
                        ? '-rotate-45 translate-y-4  opacity-50 group-hover:opacity-100'
                        : 'opacity-50 group-hover:opacity-100'
                }`}
            />
            <div
                className={`${genericHamburgerLine} ${
                    isOpen
                        ? 'opacity-0'
                        : 'opacity-50 group-hover:opacity-100'
                }`}
            />
            <div
                className={`${genericHamburgerLine} ${
                    isOpen
                        ? 'rotate-45 -translate-y-4 opacity-50 group-hover:opacity-100'
                        : 'opacity-50 group-hover:opacity-100'
                }`}
            />
        </button>
    );
};

export default Hamburger;
