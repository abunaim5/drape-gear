import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";

const DashboardLink = ({ label, href, userCount, cartCount, wishlistCount, icon: Icon }: { label: string, href: string, icon: IconType | LucideIcon, userCount: number, cartCount: number, wishlistCount: number }) => {
    const linkCls = 'flex items-center gap-[5px] px-[15px] py-[10px] hover:text-black hover:bg-[#F3F3F3] transition-all duration-[400ms]'
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <>
            <Link href={href} className={`${linkCls} ${isActive ? 'text-black' : ''} ${isActive ? 'bg-[#F3F3F3]' : ''}`}>
                <Icon size={18} />
                <span>{label} {href === '/users' && `(${userCount})` || href === '/cart' && `(${cartCount})` || href === '/wishlist' && `(${wishlistCount})`}</span>
            </Link>
            <div className='border-b-[1px]' />
        </>
    );
};

export default DashboardLink;