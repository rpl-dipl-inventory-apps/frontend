import { ReactComponent as ArrowLeft } from 'assets/arrow-left.svg';
import profilePlaceholder from 'assets/profile-placeholder.png';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const HeaderBack = (props) => {
    const { mainTitle, childTitle, enableBackBtn, backBtnLink } =
        props;

    const users = useSelector((state) => state.users);

    return (
        <header className="flex justify-between">
            <div className="w-2/3 flex flex-row items-center">
                {enableBackBtn && (
                    <div className="pr-2">
                        <Link to={backBtnLink}>
                            <ArrowLeft width="20" />
                        </Link>
                    </div>
                )}

                <div className="px-2">
                    <h2 className="text-2xl">{mainTitle}</h2>
                    <p className="text-base text-gray-500">
                        {childTitle}
                    </p>
                </div>
            </div>
            <div className="w-1/3 flex flex-row justify-end  items-center">
                <img
                    className="rounded-full w-14 h-14 hover:border hover:border-blue-400"
                    src={
                        users?.image_url
                            ? users?.image_url
                            : profilePlaceholder
                    }
                    alt="profile"
                />
                <p className="px-5">
                    {users?.username ? users.username : 'Username'}
                </p>
            </div>
        </header>
    );
};

export default HeaderBack;
