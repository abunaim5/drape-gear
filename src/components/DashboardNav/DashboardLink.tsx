import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";

const DashboardLink = ({ label, href, cartCount, wishlistCount, icon: Icon }: { label: string, href: string, icon: IconType | LucideIcon, cartCount: number, wishlistCount: number }) => {
    const linkCls = 'flex items-center gap-1 px-[15px] py-[10px] hover:text-black hover:bg-gray-50 transition-all duration-[400ms]'
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <>
            <Link href={href} className={`${linkCls} ${isActive ? 'text-black' : ''} ${isActive ? 'bg-gray-50' : ''}`}>
                <Icon className='text-lg' size={18} />
                <span>{label} {href === '/cart' && `(${cartCount})` || href === '/wishlist' && `(${wishlistCount})`}</span>
            </Link>
            <div className='border-b-[1px]' />
        </>
    );
};

export default DashboardLink;