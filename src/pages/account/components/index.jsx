import Button from 'components/Button';
import Input from 'components/Input';
import Paper from 'components/Paper';
import UploadDropZone from 'components/UploadDropZone';
import imgur from 'constant/api/imgur';
import users from 'constant/api/users';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { populateProfile } from 'store/actions/users';
import * as Yup from 'yup';

const EditAccountContent = ({ data }) => {
    const dispatch = useDispatch();
    const [uploadedFile, setUploadedFile] = useState(null);
    const formik = useFormik({
        initialValues: {
            username: data?.username ?? '',
            email: data?.email ?? null,
            image_url: data?.image_url ?? '',
            delete_hash: data?.delete_hash ?? '',
        },
        validationSchema: Yup.object().shape({
            username: Yup.string().required(
                'username field is required',
            ),
            email: Yup.string().required('email field is required'),
        }),
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: true,
        enableReinitialize: true,
        onSubmit: async (values) => {
            window.showLoader(true);
            const toastId = 'editaccount';
            const fixValues = { ...data, ...values };

            try {
                if (uploadedFile) {
                    const resImgur = await imgur.upload(uploadedFile);

                    fixValues.image_url = resImgur.data.data.link;
                    fixValues.delete_hash =
                        resImgur.data.data.deletehash;
                }

                await users.edit(fixValues);
                const res = await users.verify();
                dispatch(populateProfile(res.data));

                window.showToast(
                    toastId,
                    'info',
                    `Success Edit Account Details`,
                );

                window.showLoader(false);
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
                            label="Username"
                            inputBg="bg-theme-brown-300"
                            outline
                            error={
                                formik.touched.name &&
                                formik.errors.name
                            }
                            {...formik.getFieldProps('username')}
                        />
                    </div>
                    <div className="w-full px-2 py-3">
                        <Input
                            label="Email"
                            inputBg="bg-theme-brown-300"
                            outline
                            error={
                                formik.touched.name &&
                                formik.errors.name
                            }
                            {...formik.getFieldProps('email')}
                        />
                    </div>
                    <div className="w-full px-2 py-3 flex justify-center items-center">
                        <UploadDropZone
                            setUploadedFile={setUploadedFile}
                            imageUrl={formik.values.image_url}
                        />
                    </div>
                    <div className="w-full px-2 py-3 flex justify-center">
                        <div className="w-full md:w-1/2 xl:w-1/4">
                            <Button
                                type="primary"
                                label="Update Account"
                            />
                            ``
                        </div>
                    </div>
                </form>
            </div>
        </Paper>
    );
};

export default EditAccountContent;
