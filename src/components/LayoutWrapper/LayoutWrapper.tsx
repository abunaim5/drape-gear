'use client'
import { usePathname } from "next/navigation";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
    const location = usePathname();
    const isQuickPay = location.startsWith('/quickpay/');
    const isPayment = location === '/payment';

    return (
        <>
            {!isPayment && !isQuickPay && <Navbar />}
            <main>
                {children}
            </main>
            {!isPayment && !isQuickPay && <Footer />}
        </>
    );
};

export default LayoutWrapper;