import { FiLogOut } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { signOut } from "next-auth/react";
import { dashboardLinks } from "./dashboardLinks";
import DashboardLink from "./DashboardLink";
import { useEffect } from "react";
import { fetchProductCount } from "@/lib/features/products/productsSlice";

const DashboardNav = () => {
    const { cart } = useAppSelector((state) => state.cart);
    const productCount = useAppSelector((state) => state.products.productCount);
    const { users } = useAppSelector((state) => state.users);
    const { itemIds } = useAppSelector((state) => state.wishlist);
    const dispatch = useAppDispatch();
    const linkCls = 'flex items-center gap-[5px] px-[15px] py-[10px] hover:text-black hover:bg-[#F3F3F3] transition-all duration-[400ms]'

    const handleLogout = async () => {
        await signOut({ redirect: true, callbackUrl: '/login' });
    };

    useEffect(() => {
        dispatch(fetchProductCount({ collection: 'all' }));
    }, [dispatch]);

    return (
        <div className='flex flex-col w-full md:w-[162px] lg:w-[226px] xl:w-[382px] h-fit border text-sm text-gray-500'>
            {
                dashboardLinks.map((link, idx) => <DashboardLink key={idx} label={link.label} href={link.href} icon={link.icon} userCount={users.length} productCount={productCount} cartCount={cart?.products.length} wishlistCount={itemIds.length} />)
            }
            <button onClick={handleLogout} className={linkCls}><FiLogOut className='text-lg' /> Logout</button>
        </div>
    );
};

export default DashboardNav;