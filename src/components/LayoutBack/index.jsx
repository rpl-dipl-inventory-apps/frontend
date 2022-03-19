import HeaderBack from 'components/LayoutBack/HeaderBack';
import SideBar from 'components/SideBar';
import { motion } from 'framer-motion';

const LayoutBack = ({ children, ...props }) => {
    return (
        <div className="flex h-full w-full relative justify-end ">
            <SideBar />
            <div className="w-full py-5 px-3 2xl:w-6/7 md:px-8 lg:px-12">
                <HeaderBack {...props} />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <main
                        className="mx-auto py-2.5"
                        style={{ minHeight: '79%' }}
                    >
                        {children}
                    </main>
                </motion.div>
            </div>
        </div>
    );
};

export default LayoutBack;
