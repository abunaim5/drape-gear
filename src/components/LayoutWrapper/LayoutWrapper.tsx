'use client'
import { usePathname } from "next/navigation";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
    const location = usePathname();

    return (
        <>
            {location !== '/payment' ? <Navbar /> : ''}
            <main>
                {children}
            </main>
            {location !== '/payment' ? <Footer /> : ''}
        </>
    );
};

export default LayoutWrapper;