import { ReactComponent as ArrowRight } from 'assets/arrow-right.svg';
import { useRef } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ModalAction = (props) => {
    const { item, setSelectedItem, setModalDeleteOpen, urlEdit } =
        props;
    const [isOpen, setIsOpen] = useState(false);
    const currentElm = useRef(null);

    const handleOutsideClick = (e) => {
        if (!currentElm?.current?.contains(e.target)) {
            setIsOpen(false);
            document.removeEventListener('click', handleOutsideClick);
        }
    };

    const handleOpen = (e) => {
        if (isOpen) {
            handleOutsideClick(e);
            return;
        }
        setIsOpen(true);
        e.stopPropagation();
        document.addEventListener('click', handleOutsideClick);
    };

    return (
        <div className="relative">
            <button
                onClick={handleOpen}
                className="focus:outline-none focus:border-none"
            >
                <ArrowRight width="20" />
            </button>
            <div
                ref={currentElm}
                className={`absolute bg-white px-5 py-2 rounded-md shadow-md -top-5 right-7 ${
                    isOpen ? 'opacity-100' : 'opacity-0 -z-1'
                }`}
            >
                <div className="py-1">
                    <Link
                        className="text-black no-underline hover:underline hover:text-blue-600"
                        to={urlEdit}
                    >
                        edit
                    </Link>
                </div>
                <div className="py-1">
                    <button
                        onClick={() => {
                            setSelectedItem(item);
                            setModalDeleteOpen(true);
                        }}
                        className="text-black no-underline hover:underline hover:text-blue-600 focus:outline-none focus:border-none"
                    >
                        delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalAction;
