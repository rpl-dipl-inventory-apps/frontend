import FooterFront from 'components/LayoutFront/FooterFront';
import HeaderFront from 'components/LayoutFront/HeaderFront';
import { motion } from 'framer-motion';

const LayoutFront = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="h-full"
        >
            <HeaderFront></HeaderFront>
            <main
                className="mx-auto px-3 py-2.5"
                style={{ minHeight: '79%' }}
            >
                {children}
            </main>
            <FooterFront></FooterFront>
        </motion.div>
    );
};

export default LayoutFront;
