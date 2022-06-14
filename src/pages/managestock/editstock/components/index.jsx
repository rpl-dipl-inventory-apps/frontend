import Autocomplete from 'components/Autocomplete';
import Button from 'components/Button';
import Input from 'components/Input';
import Paper from 'components/Paper';
import products from 'constant/api/products';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

const EditStockContent = ({ data, type, inventoryId }) => {
    const history = useHistory();
    const [selectedData, setSelectedData] = useState(null);
    const [dataByIdLoading, setDataByIdLoading] = useState(false);
    const [stockAfterChanged, setStockAfterChanged] = useState(0);
    const [reduceStockResponse, setReduceStockResponse] =
        useState(null);

    const formik = useFormik({
        initialValues: {
            selectedProduct: null,
            qty: '',
            location: null,
            is_type_add: type === 'Add',
        },
        validationSchema: Yup.object().shape({
            selectedProduct: Yup.string().required(
                'product field is required',
            ),
            is_type_add: Yup.boolean(),
            location: Yup.mixed().when('is_type_add', {
                is: true,
                then: Yup.mixed()
                    .required('location field is required')
                    .typeError('location field is required'),
                otherwise: Yup.mixed().notRequired(),
            }),
            qty: Yup.number()
                .max(
                    type === 'Add'
                        ? stockAfterChanged
                        : selectedData?.stock,
                )
                .typeError('qty field is required')
                .required('qty field is required'),
        }),
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: true,
        enableReinitialize: true,
        onSubmit: async (values) => {
            window.showLoader(true);
            const toastId = 'updateproductstock';
            const fixValues = { ...selectedData };
            fixValues.stock = stockAfterChanged;
            try {
                if (type === 'Reduce') {
                    const res = await products.reduceStock(
                        selectedData.id,
                        fixValues,
                        inventoryId,
                    );
                    const stockList = res?.data?.stock_list;
                    setReduceStockResponse(stockList);
                } else {
                    fixValues?.stock_list?.push({
                        location_id: Number(values.location),
                        quantity: Number(values.qty),
                    });
                    await products.update(
                        selectedData?.id,
                        fixValues,
                        inventoryId,
                    );
                }

                window.showLoader(false);
                window.showToast(
                    toastId,
                    'info',
                    'Successfully update stock',
                );

                if (type === 'Add') {
                    setTimeout(
                        () =>
                            history.push(
                                inventoryId
                                    ? `/managestock?inventory=${inventoryId}`
                                    : '/managestock',
                            ),
                        1000,
                    );
                }
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
    useEffect(() => {
        if (formik.values.selectedProduct) {
            setDataByIdLoading(true);
            products
                .getById(formik.values.selectedProduct, inventoryId)
                .then((res) => {
                    setSelectedData(res?.data);
                    setDataByIdLoading(false);
                })
                .catch((error) => {
                    setDataByIdLoading(false);
                    window.showToast(
                        'fetchprodbyid',
                        'error',
                        error?.response?.data?.message ??
                            error?.message,
                    );
                });
        }
        if (!formik.values.selectedProduct) {
            setSelectedData(null);
            formik.resetForm();
            setStockAfterChanged(0);
        }
    }, [formik.values.selectedProduct]);

    useEffect(() => {
        if (formik.values.qty) {
            if (type === 'Add') {
                setStockAfterChanged(
                    Number(selectedData?.stock) +
                        Number(formik.values.qty),
                );
            }
            if (type === 'Reduce') {
                setStockAfterChanged(
                    Number(selectedData?.stock) -
                        Number(formik.values.qty),
                );
            }
        }
    }, [formik.values.qty]);

    return (
        <Paper>
            <div className="flex px-4 md:px-7 py-5 flex-col justify-center items-center">
                <form
                    className="w-full md:w-1/2"
                    onSubmit={formik.handleSubmit}
                >
                    <div className="w-full px-2 py-3">
                        <div className="w-full pr-5">
                            <Autocomplete
                                name="selectedProduct"
                                label="Select Your Product"
                                inputBg="bg-theme-brown-300"
                                outline
                                error={
                                    formik.touched.selectedProduct &&
                                    formik.errors.selectedProduct
                                }
                                options={data?.products ?? []}
                                labelKey="product_name"
                                valueKey="id"
                                setValue={(value) => {
                                    formik.setFieldValue(
                                        'selectedProduct',
                                        value,
                                    );
                                }}
                            />
                        </div>
                    </div>
                    {dataByIdLoading && (
                        <div className="w-full px-2 py-3">
                            <div className="w-full flex justify-center">
                                <p>loading....</p>
                            </div>
                        </div>
                    )}

                    {selectedData && !dataByIdLoading && (
                        <div className="w-full px-2 py-3">
                            <div className="w-full flex justify-start px-1 left-2">
                                Current Stock&nbsp;{' '}
                                <span className=" text-red-600 ">
                                    {selectedData?.stock}
                                </span>
                            </div>
                            {type === 'Add' && (
                                <div className="w-full pr-5 py-3">
                                    <Autocomplete
                                        name="location"
                                        label="Select Location"
                                        inputBg="bg-theme-brown-300"
                                        outline
                                        error={
                                            formik.touched.location &&
                                            formik.errors.location
                                        }
                                        options={
                                            data?.locations ?? []
                                        }
                                        labelKey="location_name"
                                        valueKey="id"
                                        setValue={(value) => {
                                            formik.setFieldValue(
                                                'location',
                                                value,
                                            );
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                    {selectedData && !dataByIdLoading && (
                        <>
                            <div className="w-full px-2 py-3 flex flex-col md:flex-row">
                                <div className="w-full pr-5">
                                    <Input
                                        autoComplete="off"
                                        type="number"
                                        label="Quantity"
                                        inputBg="bg-theme-brown-300"
                                        outline
                                        error={
                                            formik.touched.qty &&
                                            formik.errors.qty
                                        }
                                        {...formik.getFieldProps(
                                            'qty',
                                        )}
                                    />
                                </div>
                            </div>
                            {selectedData && formik.values.qty && (
                                <div className="w-full md:w-1/2 px-2 py-3">
                                    After{' '}
                                    {type === 'Add'
                                        ? 'Adding'
                                        : 'Reducing'}{' '}
                                    Stock&nbsp;{' '}
                                    <span className=" text-red-600">
                                        {stockAfterChanged}
                                    </span>
                                </div>
                            )}
                            <div className="w-full px-2 py-3 flex justify-center">
                                <div className="w-full md:w-1/2">
                                    <Button
                                        type="primary"
                                        label="Update Item"
                                    />
                                </div>
                            </div>
                            {reduceStockResponse && (
                                <div className="w-full px-2 py-3 flex flex-col justify-center">
                                    <p>
                                        pick up this items at the
                                        following locations :
                                    </p>
                                    <br />
                                    <ul className="list-disc">
                                        {reduceStockResponse?.map(
                                            (item, idx) => (
                                                <li key={idx}>
                                                    <b>
                                                        {
                                                            item?.location_name
                                                        }
                                                    </b>{' '}
                                                    as much as{' '}
                                                    <b>
                                                        {
                                                            item?.quantity
                                                        }
                                                    </b>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                </div>
                            )}
                        </>
                    )}
                </form>
            </div>
        </Paper>
    );
};

export default EditStockContent;
