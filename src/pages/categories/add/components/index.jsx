import Button from 'components/Button';
import Input from 'components/Input';
import Paper from 'components/Paper';
import categories from 'constant/api/categories';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

const AddCategories = () => {
    const history = useHistory();
    const formik = useFormik({
        initialValues: {
            category_name: '',
        },
        validationSchema: Yup.object().shape({
            category_name: Yup.string().required(
                'category name field is required',
            ),
        }),
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: true,
        onSubmit: async (values) => {
            // dispatch(setLoader(true));
            window.showLoader(true);
            const toastId = 'categories';
            try {
                await categories.create(values);
                window.showLoader(false);
                window.showToast(
                    toastId,
                    'info',
                    'Success Create New Categories',
                );
                setTimeout(() => history.push('/categories'), 1000);
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
        <Paper>
            <div className="flex px-4 md:px-7 py-5 flex-col">
                <form onSubmit={formik.handleSubmit}>
                    <div className="w-full px-2 py-3">
                        <Input
                            label="Category Name"
                            inputBg="bg-theme-brown-300"
                            outline
                            error={
                                formik.touched.category_name &&
                                formik.errors.category_name
                            }
                            {...formik.getFieldProps('category_name')}
                        />
                    </div>
                    <div className="w-full px-2 py-3 flex justify-center">
                        <div className="w-full md:w-1/2 xl:w-1/4">
                            <Button
                                type="primary"
                                label="Add New Category"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </Paper>
    );
};

export default AddCategories;
