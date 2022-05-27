import Button from 'components/Button';
import Input from 'components/Input';
import Paper from 'components/Paper';
import supplier from 'constant/api/supplier';
import { Form, Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

const AddSupplierContent = () => {
    const history = useHistory();

    const initialValues = {
        supplier_email: '',
    };

    const validationSchema = Yup.object().shape({
        supplier_email: Yup.string().required(
            'email field is required',
        ),
    });

    const handleSubmit = async (values) => {
        window.showLoader(true);
        const toastId = 'email';

        try {
            await supplier.add(values);

            window.showToast(toastId, 'info', `Success add supplier`);

            window.showLoader(false);
            setTimeout(() => history.push('/suppliers'), 1000);
        } catch (error) {
            window.showLoader(false);
            window.showToast(
                toastId,
                'error',
                error?.response?.data?.message ?? error?.message,
            );
        }
    };

    return (
        <Paper>
            <div className="flex px-4 md:px-7 py-5 flex-col">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    validateOnChange={true}
                    validateOnBlur={true}
                    validateOnMount={true}
                    enableReinitialize={true}
                >
                    {(props) => (
                        <Form>
                            <div className="w-full px-2 py-3">
                                <Input
                                    label="Supplier Email"
                                    inputBg="bg-theme-brown-300"
                                    outline
                                    error={
                                        props.touched
                                            .supplier_email &&
                                        props.errors.supplier_email
                                    }
                                    {...props.getFieldProps(
                                        'supplier_email',
                                    )}
                                />
                            </div>

                            <div className="w-full px-2 py-3 flex justify-center">
                                <div className="w-full md:w-1/2 xl:w-1/4">
                                    <Button
                                        type="primary"
                                        label="Add"
                                    />
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </Paper>
    );
};

export default AddSupplierContent;
