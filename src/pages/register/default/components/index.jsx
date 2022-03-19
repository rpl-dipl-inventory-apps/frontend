import registerImgPng from 'assets/register_img.png';
import Button from 'components/Button';
import Input from 'components/Input';
import { useFormik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

const Content = () => {
    const history = useHistory();
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirm_password: '',
        },
        validationSchema: Yup.object().shape({
            username: Yup.string().required('username required'),
            email: Yup.string()
                .email('invalid email')
                .required('email required'),
            password: Yup.string()
                .min(8, 'password too short')
                .required('password required'),
            confirm_password: Yup.string().oneOf(
                [Yup.ref('password'), null],
                'passwords must match',
            ),
        }),
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: true,
        onSubmit: async () => {
            window.showLoader(true);
            const toastId = 'login';
            window.showLoader(false);
            window.showToast(
                toastId,
                'info',
                'Success Create New Account',
            );
            setTimeout(() => history.push('/login'), 1000);
        },
    });

    return (
        <div className="container flex flex-col md:flex-row mx-auto items-center mt-10">
            <div className="w-full md:w-1/2 m-auto flex justify-center py-2">
                <img src={registerImgPng} alt="Register" />
            </div>

            <div className="w-full md:w-1/2 flex justify-center py-2">
                <form
                    className="w-full md:w-2/3"
                    onSubmit={formik.handleSubmit}
                >
                    <div>
                        <p className="text-3xl text-theme-orange-500">
                            Start to tracking your items
                        </p>
                        <p className="text-3xl text-theme-orange-500">
                            in the system
                        </p>
                    </div>
                    <div className="my-7">
                        <Input
                            label="Username"
                            placeholder="username"
                            type="text"
                            error={
                                formik.touched.username &&
                                formik.errors.username
                            }
                            {...formik.getFieldProps('username')}
                        />
                    </div>
                    <div className="my-7">
                        <Input
                            label="Email"
                            placeholder="Email"
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
                            label="Password"
                            placeholder="Password"
                            type="password"
                            color="gray"
                            size="lg"
                            outline={false}
                            error={
                                formik.touched.password &&
                                formik.errors.password
                            }
                            {...formik.getFieldProps('password')}
                        />
                    </div>
                    <div className="my-7">
                        <Input
                            label="Confirm Password"
                            placeholder="Confirm Password"
                            type="password"
                            error={
                                formik.touched.confirm_password &&
                                formik.errors.confirm_password
                            }
                            {...formik.getFieldProps(
                                'confirm_password',
                            )}
                        />
                    </div>
                    <div className="mb-3 my-7">
                        <Button
                            type="submit"
                            label="Sign Up"
                        ></Button>
                    </div>
                    <div className="my-7">
                        <p className=" text-gray-400 text-right text-xs md:text-base">
                            already have account?{' '}
                            <span>
                                <u>
                                    <Link to="/login">sign in</Link>
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
