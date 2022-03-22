import Autocomplete from 'components/Autocomplete';
import Button from 'components/Button';
import Input from 'components/Input';
import Paper from 'components/Paper';
import UploadDropZone from 'components/UploadDropZone';
import categories from 'constant/api/categories';
import imgur from 'constant/api/imgur';
import locations from 'constant/api/locations';
import products from 'constant/api/products';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

const AddItemContent = () => {
    const [uploadedFile, setUploadedFile] = useState(null);
    // const [progress, setProgress] = useState(0);
    const [locationsList, setLocationsList] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [optionLoading, setOptionLoading] = useState(false);
    const history = useHistory();

    useEffect(async () => {
        const toastId = 'fetchloccat';
        try {
            setOptionLoading(true);
            const [resLocation, resCategory] = await Promise.all([
                locations.getAll(),
                categories.getAll(),
            ]);

            setLocationsList(resLocation.data);
            setCategoriesList(resCategory.data);
            setOptionLoading(false);
        } catch (error) {
            window.showToast(
                toastId,
                'error',
                error?.response?.data?.message ?? error?.message,
            );
        }
    }, []);

    const formik = useFormik({
        initialValues: {
            product_name: '',
            category: '',
            location: '',
            price: '',
            sku: '',
            stock: '',
            image_url: '',
            delete_hash: '',
        },
        validationSchema: Yup.object().shape({
            product_name: Yup.string().required(
                'name field is required',
            ),
            category: Yup.string().required(
                'category field is required',
            ),
            location: Yup.string().required(
                'location field is required',
            ),
            price: Yup.string().required('price field is required'),
            sku: Yup.string().required('sku field is required'),
            stock: Yup.string().required('stock field is required'),
        }),
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: true,
        onSubmit: async (values) => {
            window.showLoader(true);
            const fixValues = { ...values };
            const toastId = 'createproduct';

            try {
                if (uploadedFile) {
                    const resImgur = await imgur.upload(uploadedFile);

                    fixValues.image_url = resImgur.data.data.link;
                    fixValues.delete_hash =
                        resImgur.data.data.deletehash;
                }
                fixValues.category = {
                    id: fixValues.category,
                };
                fixValues.location = {
                    id: fixValues.location,
                };
                await products.create(fixValues);

                window.showToast(
                    toastId,
                    'info',
                    'Success Create New Product',
                );

                window.showLoader(false);
                history.push('/items');
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
                            label="Product Name"
                            inputBg="bg-theme-brown-300"
                            outline
                            error={
                                formik.touched.name &&
                                formik.errors.name
                            }
                            {...formik.getFieldProps('product_name')}
                        />
                    </div>
                    <div className="w-full flex flex-col md:flex-row px-2 md:py-3">
                        <div className="w-full md:w-1/2 md:pr-2 py-3 md:py-0">
                            <Autocomplete
                                name="category"
                                label="Category"
                                inputBg="bg-theme-brown-300"
                                outline
                                error={
                                    formik.touched.category &&
                                    formik.errors.category
                                }
                                options={categoriesList}
                                labelKey="category_name"
                                valueKey="id"
                                setValue={(value) => {
                                    formik.setFieldValue(
                                        'category',
                                        value,
                                    );
                                }}
                                loading={optionLoading}
                            />
                        </div>
                        <div className="w-full md:w-1/2 md:pl-2 py-3 md:py-0">
                            <Autocomplete
                                name="location"
                                label="Location"
                                inputBg="bg-theme-brown-300"
                                outline
                                error={
                                    formik.touched.location &&
                                    formik.errors.location
                                }
                                options={locationsList}
                                labelKey="location_name"
                                valueKey="id"
                                setValue={(value) => {
                                    formik.setFieldValue(
                                        'location',
                                        value,
                                    );
                                }}
                                loading={optionLoading}
                            />
                        </div>
                    </div>
                    <div className="w-full flex flex-col md:flex-row px-2 md:py-3">
                        <div className="w-full md:w-1/2 md:pr-2 py-3 md:py-0">
                            <Input
                                label="Price"
                                inputBg="bg-theme-brown-300"
                                outline
                                error={
                                    formik.touched.price &&
                                    formik.errors.price
                                }
                                {...formik.getFieldProps('price')}
                            />
                        </div>
                        <div className="w-full md:w-1/2 md:pl-2 py-3 md:py-0">
                            <Input
                                label="SKU"
                                inputBg="bg-theme-brown-300"
                                outline
                                error={
                                    formik.touched.sku &&
                                    formik.errors.sku
                                }
                                {...formik.getFieldProps('sku')}
                            />
                        </div>
                    </div>
                    <div className="w-full px-2 py-3">
                        <Input
                            label="Stock"
                            inputBg="bg-theme-brown-300"
                            outline
                            error={
                                formik.touched.stock &&
                                formik.errors.stock
                            }
                            {...formik.getFieldProps('stock')}
                        />
                    </div>
                    <div className="w-full px-2 py-3 flex justify-center items-center">
                        <UploadDropZone
                            setUploadedFile={setUploadedFile}
                        />
                    </div>
                    <div className="w-full px-2 py-3 flex justify-center">
                        <div className="w-full md:w-1/2 xl:w-1/4">
                            <Button
                                type="primary"
                                label="Add New Item"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </Paper>
    );
};

export default AddItemContent;
