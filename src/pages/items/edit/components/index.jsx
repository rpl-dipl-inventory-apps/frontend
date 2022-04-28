import Autocomplete from 'components/Autocomplete';
import Button from 'components/Button';
import Input from 'components/Input';
import Paper from 'components/Paper';
import UploadDropZone from 'components/UploadDropZone';
import categories from 'constant/api/categories';
import imgur from 'constant/api/imgur';
import locations from 'constant/api/locations';
import products from 'constant/api/products';
import { FieldArray, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

const AddItemContent = ({ data }) => {
    const history = useHistory();
    const [uploadedFile, setUploadedFile] = useState(null);
    const [locationsList, setLocationsList] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [optionLoading, setOptionLoading] = useState(false);
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

    const initialValues = {
        product_name: data?.product_name ?? '',
        category: data?.category ?? null,
        category_id: data?.category_id ?? null,
        price: data?.price ?? '',
        sku: data?.sku ?? '',
        stock: data?.stock ?? '',
        image_url: data?.image_url ?? '',
        delete_hash: data?.delete_hash ?? '',
        stock_list: data?.stock_list ?? [],
    };

    const validationSchema = Yup.object().shape({
        product_name: Yup.string().required('name field is required'),
        category_id: Yup.number()
            .typeError('category field is required')
            .required('category field is required'),
        price: Yup.string().required('price field is required'),
        sku: Yup.string().required('sku field is required'),
        stock_list: Yup.array()
            .of(
                Yup.object().shape({
                    location_id: Yup.number()
                        .typeError('location is required')
                        .required('location is required'),
                    quantity: Yup.number()
                        .typeError('quantity is required')
                        .required('quantity is required'),
                }),
            )
            .min(1, 'stock is required'),
    });

    const handleSubmit = async (values) => {
        window.showLoader(true);
        const toastId = 'updateproduct';
        const fixValues = {
            ...data,
            ...values,
            stock_list: values.stock_list.map((stock) => {
                const fixStock = { ...stock };
                delete fixStock.location;
                delete fixStock.location_name;
                return fixStock;
            }),
        };

        try {
            if (uploadedFile) {
                const resImgur = await imgur.upload(uploadedFile);

                fixValues.image_url = resImgur.data.data.link;
                fixValues.delete_hash = resImgur.data.data.deletehash;
            }

            delete fixValues.category;
            delete fixValues.category_name;

            await products.update(data?.id, fixValues);

            window.showToast(
                toastId,
                'info',
                `Success Update Product With id ${data?.id}`,
            );

            window.showLoader(false);
            setTimeout(() => history.push('/items'), 1000);
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
                                    label="Product Name"
                                    inputBg="bg-theme-brown-300"
                                    outline
                                    error={
                                        props.touched.product_name &&
                                        props.errors.product_name
                                    }
                                    {...props.getFieldProps(
                                        'product_name',
                                    )}
                                />
                            </div>
                            <div className="w-full px-2 py-3">
                                <Autocomplete
                                    defaultValue={
                                        props.values?.category ?? null
                                    }
                                    name="category"
                                    label="Category"
                                    inputBg="bg-theme-brown-300"
                                    outline
                                    error={
                                        props.touched.category_id &&
                                        props.errors.category_id
                                    }
                                    options={categoriesList}
                                    labelKey="category_name"
                                    valueKey="id"
                                    setValue={(value) => {
                                        props.setFieldValue(
                                            'category_id',
                                            value,
                                        );
                                    }}
                                    loading={optionLoading}
                                />
                            </div>
                            <div className="w-full flex flex-col md:flex-row px-2 md:py-3">
                                <div className="w-full md:w-1/2 md:pr-2 py-3 md:py-0">
                                    <Input
                                        label="Price"
                                        inputBg="bg-theme-brown-300"
                                        outline
                                        error={
                                            props.touched.price &&
                                            props.errors.price
                                        }
                                        {...props.getFieldProps(
                                            'price',
                                        )}
                                    />
                                </div>
                                <div className="w-full md:w-1/2 md:pl-2 py-3 md:py-0">
                                    <Input
                                        label="SKU"
                                        inputBg="bg-theme-brown-300"
                                        outline
                                        error={
                                            props.touched.sku &&
                                            props.errors.sku
                                        }
                                        {...props.getFieldProps(
                                            'sku',
                                        )}
                                    />
                                </div>
                            </div>
                            <FieldArray name="stock_list">
                                {(arrayHelper) => (
                                    <>
                                        {props.values?.stock_list?.map(
                                            (stock, index) => (
                                                <div
                                                    key={index}
                                                    className="w-full flex flex-col md:flex-row px-2 md:py-3"
                                                >
                                                    <div className="w-full md:w-1/2 md:pr-2 py-3 md:py-0">
                                                        <Autocomplete
                                                            defaultValue={
                                                                stock?.location ??
                                                                null
                                                            }
                                                            name={`stock_list[${index}].location`}
                                                            label={`Location ${
                                                                index +
                                                                1
                                                            }`}
                                                            inputBg="bg-theme-brown-300"
                                                            outline
                                                            error={
                                                                props
                                                                    .touched
                                                                    ?.stock_list?.[
                                                                    index
                                                                ]
                                                                    ?.location_id &&
                                                                props
                                                                    .errors
                                                                    ?.stock_list?.[
                                                                    index
                                                                ]
                                                                    ?.location_id
                                                            }
                                                            options={
                                                                locationsList
                                                            }
                                                            labelKey="location_name"
                                                            valueKey="id"
                                                            setValue={(
                                                                value,
                                                            ) => {
                                                                props.setFieldValue(
                                                                    `stock_list[${index}].location_id`,
                                                                    value,
                                                                );
                                                            }}
                                                            loading={
                                                                optionLoading
                                                            }
                                                            disabled
                                                        />
                                                    </div>
                                                    <div className="w-full md:w-[46%] md:pl-2 py-3 md:py-0">
                                                        <Input
                                                            label="Stock"
                                                            inputBg="bg-theme-brown-300"
                                                            outline
                                                            error={
                                                                props
                                                                    .touched
                                                                    ?.stock_list?.[
                                                                    index
                                                                ]
                                                                    ?.quantity &&
                                                                props
                                                                    .errors
                                                                    ?.stock_list?.[
                                                                    index
                                                                ]
                                                                    ?.quantity
                                                            }
                                                            {...props.getFieldProps(
                                                                `stock_list[${index}].quantity`,
                                                            )}
                                                            disabled
                                                        />
                                                    </div>
                                                    <div className="w-[4%] flex justify-center items-center px-2 text-2xl">
                                                        <button
                                                            disabled
                                                            onClick={() =>
                                                                arrayHelper.remove(
                                                                    index,
                                                                )
                                                            }
                                                            type="button"
                                                            className={`px-3 py-1  ml-5 text-white bg-red-400 disabled:bg-red-300 disabled:cursor-default hover:bg-red-500 rounded-md ${
                                                                (props
                                                                    .touched
                                                                    ?.stock_list?.[
                                                                    index
                                                                ]
                                                                    ?.location_id &&
                                                                    props
                                                                        .errors
                                                                        ?.stock_list?.[
                                                                        index
                                                                    ]
                                                                        ?.location_id) ||
                                                                (props
                                                                    .touched
                                                                    ?.stock_list?.[
                                                                    index
                                                                ]
                                                                    ?.quantity &&
                                                                    props
                                                                        .errors
                                                                        ?.stock_list?.[
                                                                        index
                                                                    ]
                                                                        ?.quantity)
                                                                    ? 'mt-[4px]'
                                                                    : 'mt-[24px]'
                                                            }`}
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                </div>
                                            ),
                                        )}
                                        <div className="w-full px-2 py-3 flex justify-end items-center">
                                            <p className="text-red-500 text-center px-10">
                                                Please use the manage
                                                stock feature to
                                                update stock
                                            </p>
                                            <p className="text-red-500 text-center px-10">
                                                {props?.touched
                                                    ?.stock_list &&
                                                    !Array.isArray(
                                                        props?.errors
                                                            ?.stock_list,
                                                    ) &&
                                                    props?.errors
                                                        ?.stock_list}
                                            </p>
                                            <div className="w-full md:w-1/2 xl:w-1/5">
                                                <Button
                                                    disabled
                                                    color="primary"
                                                    label="Add stock"
                                                    onClick={() =>
                                                        arrayHelper.insert(
                                                            props
                                                                .values
                                                                ?.stock_list
                                                                ?.length,
                                                            {
                                                                location_id:
                                                                    null,
                                                                quantity: 0,
                                                                location:
                                                                    null,
                                                            },
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </FieldArray>

                            <div className="w-full px-2 py-3 flex justify-center items-center">
                                <UploadDropZone
                                    setUploadedFile={setUploadedFile}
                                    imageUrl={props.values.image_url}
                                />
                            </div>
                            <div className="w-full px-2 py-3 flex justify-center">
                                <div className="w-full md:w-1/2 xl:w-1/4">
                                    <Button
                                        type="primary"
                                        label="Update Item"
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

export default AddItemContent;
