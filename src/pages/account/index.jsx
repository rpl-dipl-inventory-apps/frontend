import LayoutBack from 'components/LayoutBack';
import Content from 'pages/account/components';
import { useSelector } from 'react-redux';

const Account = () => {
    const user = useSelector((state) => state.users);

    return (
        <LayoutBack
            mainTitle="My Account"
            childTitle="Edit account details"
            enableBackBtn
            backBtnLink="/dashboard"
        >
            <Content data={user} />
        </LayoutBack>
    );
};

export default Account;
