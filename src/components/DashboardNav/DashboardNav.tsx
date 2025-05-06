import { FiLogOut } from "react-icons/fi";
import { useAppSelector } from '@/lib/hooks';
import { signOut, useSession } from "next-auth/react";
import DashboardLink from "./DashboardLink";
import { adminDashboardLinks, userDashboardLinks } from "./dashboardLinks";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const DashboardNav = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const isAdmin = session?.user.role === 'admin';
    const isUser = session?.user.role === 'user';
    const ordersCount = useAppSelector((state) => state.orders.orders.length);
    const { cart } = useAppSelector((state) => state.cart);
    const { productCount} = useAppSelector((state) => state.products);
    const { users } = useAppSelector((state) => state.users);
    const { itemIds } = useAppSelector((state) => state.wishlist);
    const linkCls = 'flex items-center gap-[5px] px-[15px] py-[10px] hover:text-black hover:bg-[#F3F3F3] transition-all duration-[400ms]'

    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push('/login');
        router.refresh();
        toast.success('Logged out. Come back soon!');
    };

    return (
        <div className='flex flex-col w-full md:w-[162px] lg:w-[226px] xl:w-[382px] h-fit border text-sm text-gray-500'>
            {
                isAdmin ? (adminDashboardLinks.map((link, idx) => <DashboardLink key={idx} label={link.label} href={link.href} icon={link.icon} userCount={users.length} ordersCount={ordersCount} productCount={productCount} cartCount={cart?.products.length} wishlistCount={itemIds.length} />)) : isUser ?
                    (userDashboardLinks.map((link, idx) => <DashboardLink key={idx} label={link.label} href={link.href} icon={link.icon} userCount={users.length} ordersCount={ordersCount} productCount={productCount} cartCount={cart?.products.length} wishlistCount={itemIds?.length} />)) : <></>
            }
            <button onClick={handleLogout} className={linkCls}><FiLogOut className='text-lg' /> Logout</button>
        </div>
    );
};

export default DashboardNav;