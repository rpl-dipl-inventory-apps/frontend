import loginImgPng from 'assets/login_img.png';
import Button from 'components/Button';
import Input from 'components/Input';
import users from 'constant/api/users';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { setAuthenticationToken } from 'store/actions/authentication';
import { populateProfile } from 'store/actions/users';
import * as Yup from 'yup';

const Content = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email('invalid email')
                .required('email required'),
            password: Yup.string()
                .min(8, 'password too short')
                .required('password required'),
        }),
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: true,
        onSubmit: async (values) => {
            const path =
                localStorage.getItem('redirect') || '/dashboard';
            window.showLoader(true);
            window.setLoaderIsAuth(true);
            const toastId = 'login';

            try {
                const res = await users.login(values);
                dispatch(setAuthenticationToken(res.data.token));
                const resUser = await users.verify();
                dispatch(populateProfile(resUser?.data));
                window.showLoader(false);
                window.showToast(toastId, 'info', 'Success Login');
                history.push(path);
            } catch (error) {
                window.showLoader(false);
                window.showToast(
                    toastId,
                    'error',
                    error?.response?.data?.message ?? error?.message,
                );
            }
        },
    });

    return (
        <div className="container flex flex-col md:flex-row mx-auto items-center mt-10 flex-shrink">
            <div className="transform w-full md:w-1/2 m-auto flex justify-center ">
                <img
                    className="object-cover overflow-hidden "
                    src={loginImgPng}
                    alt="loginImage"
                />
            </div>

            <div className="w-full md:w-1/2 flex justify-center self-start my-16 mx-auto">
                <form
                    className="w-full md:w-2/3"
                    onSubmit={formik.handleSubmit}
                >
                    <div className="">
                        <p className="text-3xl text-theme-orange-500">
                            Track your items in the
                        </p>
                        <p className="text-3xl text-theme-orange-500 ">
                            inventory system
                        </p>
                    </div>

                    <div className="my-7">
                        <Input
                            placeholder="insert your email"
                            label="Email"
                            type="text"
                            error={
                                formik.touched.email &&
                                formik.errors.email
                            }
                            {...formik.getFieldProps('email')}
                        />
                    </div>
                    <div className="my-7">
                        <Input
                            placeholder="insert your password"
                            label="Password"
                            type="password"
                            error={
                                formik.touched.password &&
                                formik.errors.password
                            }
                            {...formik.getFieldProps('password')}
                        />
                    </div>
                    <div className="mb-3 my-7">
                        <Button
                            type="submit"
                            label="Sign In"
                        ></Button>
                    </div>
                    <div className="my-7">
                        <p className=" text-gray-400 text-right text-xs md:text-base">
                            dont have account?{' '}
                            <span>
                                <u>
                                    <Link to="/register">
                                        {' '}
                                        sign up
                                    </Link>
                                </u>
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Content;
