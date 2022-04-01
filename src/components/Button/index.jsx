const Button = (props) => {
    const { label, color, type, children, ...res } = props;

    const getColorBtn = (type) => {
        if (type === 'primary') {
            return 'bg-theme-orange-500 text-white hover:bg-theme-orange-400';
        } else if (type === 'secondary') {
            return 'bg-theme-orange-200 text-white hover:bg-theme-orange-400';
        } else if (type === 'home') {
            return 'bg-white text-theme-orange-500 hover:bg-theme-orange-400 hover:border hover:border-white hover:text-white';
        } else {
            return 'bg-theme-orange-500 text-white hover:bg-theme-orange-400';
        }
    };

    return (
        <button
            {...res}
            type={type ?? 'button'}
            className={`${getColorBtn(
                color,
            )}  py-2 px-7 rounded-md  transition duration-500 w-full focus:outline-none`}
        >
            {label ?? children}
        </button>
    );
};

export default Button;
