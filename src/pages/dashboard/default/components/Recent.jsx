import { ReactComponent as ArrowRight } from 'assets/arrow-right.svg';
import placeholderImg from 'assets/No-Image-Placeholder.png';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

const Recent = ({ data }) => {
    const dataRecent = useMemo(() => (data ? [...data] : []), [data]);

    return (
        <div>
            <div>
                <p>Recent Product Saved</p>
            </div>
            <div>
                <ul className="w-full">
                    <li className="flex flex-row justify-between bg-theme-brown-300 my-3 items-center rounded-md py-3 px-0.5">
                        <div className="flex flex-row lg:px-2 w-1/2  lg:w-1/4 items-center">
                            <div className="px-2 w-1/2"></div>
                            <div className="px-2 lg:mr-0 lg:px-2 w-full text-xs md:text-lg truncate">
                                Product Name
                            </div>
                        </div>
                        <div className="px-1 lg:px-2 lg:w-1/4 w-1/5 flex justify-center">
                            <p className="text-xs md:text-lg truncate">
                                Price
                            </p>
                        </div>
                        <div className="px-1 lg:px-2 lg:w-1/4 w-1/5 flex justify-center">
                            <p className="text-xs md:text-lg truncate">
                                Stock
                            </p>
                        </div>
                        <div className="px-1 lg:px-2 lg:w-1/4 w-1/4 flex justify-center">
                            <p className="text-xs md:text-lg truncate">
                                created at
                            </p>
                        </div>
                        <div className="lg:px-5 lg:w-1/4 w-1/12 flex justify-end "></div>
                    </li>
                    {dataRecent?.map((item, index) => (
                        <li
                            key={index}
                            className="flex flex-row justify-between bg-theme-brown-300 my-3 items-center rounded-md py-3 px-0.5"
                        >
                            <div className="flex flex-row lg:px-2 w-1/2  lg:w-1/4 items-center">
                                <div className="px-2 w-1/2">
                                    <img
                                        className="rounded-md"
                                        width={100}
                                        height={100}
                                        src={
                                            item.image_url
                                                ? item.image_url
                                                : placeholderImg
                                        }
                                        alt="product"
                                    />
                                </div>
                                <div className="px-2 lg:mr-0 lg:px-2 w-full text-xs md:text-lg truncate">
                                    {item.product_name}
                                </div>
                            </div>
                            <div className="px-1 lg:px-2 lg:w-1/4 w-1/5 flex justify-center">
                                <p className="text-xs md:text-lg truncate">
                                    {item.price}
                                </p>
                            </div>
                            <div className="px-1 lg:px-2 lg:w-1/4 w-1/5 flex justify-center">
                                <p className="text-xs md:text-lg truncate">
                                    {item.stock}
                                </p>
                            </div>
                            <div className="px-1 lg:px-2 lg:w-1/4 w-1/4 flex justify-center">
                                <p className="text-xs md:text-lg truncate">
                                    {new Date(
                                        item.created_at,
                                    ).toLocaleString()}
                                </p>
                            </div>
                            <div className="lg:px-5 lg:w-1/4 w-1/12 flex justify-end ">
                                <Link to={`/items/edit/${item.id}`}>
                                    <ArrowRight width="20" />
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Recent;
