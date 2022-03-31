import Button from 'components/Button';
import Input from 'components/Input';
import Paper from 'components/Paper';
import locations from 'constant/api/locations';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

const EditLocationContent = ({ data }) => {
    const history = useHistory();
    const formik = useFormik({
        initialValues: {
            id: data?.id ?? '',
            location_name: data?.location_name ?? '',
            location_code: data?.location_code ?? '',
        },
        validationSchema: Yup.object().shape({
            location_name: Yup.string().required(
                'location name field is required',
            ),
            location_code: Yup.string().required(
                'location code field is required',
            ),
        }),
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: true,
        enableReinitialize: true,
        onSubmit: async (values) => {
            window.showLoader(true);
            const toastId = 'locationEdit';
            try {
                await locations.update(values);
                window.showLoader(false);
                window.showToast(
                    toastId,
                    'info',
                    `Success Edit Location ${values.location_name}`,
                );
                setTimeout(() => history.push('/locations'), 1000);
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
                    <input name="id" values={data?.id} hidden />
                    <div className="w-full px-2 py-3">
                        <Input
                            label="Location Name"
                            inputBg="bg-theme-brown-300"
                            outline
                            error={
                                formik.touched.location_name &&
                                formik.errors.location_name
                            }
                            {...formik.getFieldProps('location_name')}
                        />
                    </div>
                    <div className="w-full px-2 py-3">
                        <Input
                            label="Location Code"
                            inputBg="bg-theme-brown-300"
                            outline
                            error={
                                formik.touched.location_code &&
                                formik.errors.location_code
                            }
                            {...formik.getFieldProps('location_code')}
                        />
                    </div>
                    <div className="w-full px-2 py-3 flex justify-center">
                        <div className="w-full md:w-1/2 xl:w-1/4">
                            <Button
                                type="primary"
                                label="Edit Location"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </Paper>
    );
};

export default EditLocationContent;
