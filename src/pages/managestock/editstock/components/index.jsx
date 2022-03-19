import Autocomplete from 'components/Autocomplete';
import Button from 'components/Button';
import Input from 'components/Input';
import Paper from 'components/Paper';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

const EditStockContent = ({ data, type }) => {
    const history = useHistory();
    const [selectedData, setSelectedData] = useState(null);
    const [dataByIdLoading, setDataByIdLoading] = useState(false);
    const [stockAfterChanged, setStockAfterChanged] = useState(0);

    const formik = useFormik({
        initialValues: {
            selectedProduct: null,
            qty: '',
        },
        validationSchema: Yup.object().shape({
            selectedProduct: Yup.string().required(
                'product field is required',
            ),
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
        onSubmit: async () => {
            window.showLoader(true);
            const toastId = 'updateproductstock';
            const fixValues = { ...selectedData };
            fixValues.stock = stockAfterChanged;
            window.showLoader(false);
            window.showToast(
                toastId,
                'info',
                'Successfully update stock',
            );
            setTimeout(() => history.push('/managestock'), 1000);
        },
    });
    useEffect(() => {
        if (formik.values.selectedProduct) {
            setDataByIdLoading(true);
            setSelectedData([]);
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
                                options={data ?? []}
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
                            <div className="w-full flex justify-start">
                                Current Stock&nbsp;{' '}
                                <span className=" text-red-600">
                                    {selectedData?.stock}
                                </span>
                            </div>
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
                        </>
                    )}
                </form>
            </div>
        </Paper>
    );
};

export default EditStockContent;
