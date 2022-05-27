import Autocomplete from 'components/Autocomplete';
import Button from 'components/Button';
import Paper from 'components/Paper';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';

const SelectInventoryContent = (props) => {
    const history = useHistory();
    const { data } = props;
    const formik = useFormik({
        initialValues: {
            selectedInventory: '',
        },
        enableReinitialize: true,
    });

    return (
        <Paper>
            <div className="h-160 md:h-180">
                <div className="h-full w-full flex flex-col justify-center items-center">
                    <div className="w-1/3 py-7">
                        <Autocomplete
                            name="selectedInventory"
                            label="Select Your Inventory"
                            inputBg="bg-theme-brown-300"
                            outline
                            error={
                                formik.touched.selectedInventory &&
                                formik.errors.selectedInventory
                            }
                            options={data ?? []}
                            labelKey="owner_username"
                            valueKey="owner_id"
                            setValue={(value) => {
                                formik.setFieldValue(
                                    'selectedInventory',
                                    value,
                                );
                            }}
                        />
                    </div>
                    <div className="w-1/3 py-7">
                        <Button
                            label="Go"
                            type="primary"
                            onClick={() => {
                                localStorage.setItem(
                                    'inventory',
                                    formik.values.selectedInventory,
                                );
                                localStorage.setItem(
                                    'inventory_name',
                                    data?.find(
                                        (item) =>
                                            item.owner_id ===
                                            formik.values
                                                .selectedInventory,
                                    )?.owner_username,
                                );
                                history.push(
                                    `/managestock?inventory=${formik.values.selectedInventory}`,
                                );
                            }}
                        />
                    </div>
                </div>
            </div>
        </Paper>
    );
};

export default SelectInventoryContent;
