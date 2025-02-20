import { FiLogOut } from "react-icons/fi";
import { useAppSelector } from '@/lib/hooks';
import { signOut } from "next-auth/react";
import { dashboardLinks } from "./dashboardLinks";
import DashboardLink from "./DashboardLink";

const DashboardNav = () => {
    const { cartItems } = useAppSelector((state) => state.cart);
    const { itemIds } = useAppSelector((state) => state.wishlist);
    const linkCls = 'flex items-center gap-1 px-[15px] py-[10px] hover:text-black hover:bg-gray-50 transition-all duration-[400ms]'

    const handleLogout = async () => {
        await signOut({ redirect: true, callbackUrl: '/login' });
    };

    return (
        <div className='flex flex-col w-[412px] h-fit border text-sm text-gray-500'>
            {
                dashboardLinks.map((link, idx) => <DashboardLink key={idx} label={link.label} href={link.href} icon={link.icon} cartCount={cartItems.length} wishlistCount={itemIds.length} />)
            }
            <button onClick={handleLogout} className={linkCls}><FiLogOut className='text-lg' /> Logout</button>
        </div>
    );
};

export default DashboardNav;