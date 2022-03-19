import Button from 'components/Button';
import Paper from 'components/Paper';
import { useHistory } from 'react-router-dom';

const ManageStockDefaultStock = () => {
    const history = useHistory();
    return (
        <Paper>
            <div className="h-160 md:h-200">
                <div className="h-full w-full flex flex-col justify-center items-center">
                    <div className="w-1/3 py-7">
                        <Button
                            label="Add Stock"
                            type="primary"
                            onClick={() =>
                                history.push(
                                    '/managestock/edit?type=Add',
                                )
                            }
                        />
                    </div>
                    <div className="w-1/3 py-7">
                        <Button
                            label="Reduce Stock"
                            type="primary"
                            onClick={() =>
                                history.push(
                                    '/managestock/edit?type=Reduce',
                                )
                            }
                        />
                    </div>
                </div>
            </div>
        </Paper>
    );
};

export default ManageStockDefaultStock;
