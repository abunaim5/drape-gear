import { FiLogOut } from "react-icons/fi";
import { useAppSelector } from '@/lib/hooks';
import Link from 'next/link';
// import { usePathname } from 'next/navigation';
import React from 'react';
import { IoMdHeartEmpty } from "react-icons/io";
import { PiShoppingCartSimple } from "react-icons/pi";
import { LayoutDashboard, MapPinHouse } from "lucide-react";

const DashboardNav = () => {
    const { cartItems } = useAppSelector((state) => state.cart);
    const { itemIds } = useAppSelector((state) => state.wishlist);
    // const pathname = usePathname();
    // const isActive = pathname === pathname;

    return (
        <div className='flex flex-col w-[412px] h-fit border text-sm text-gray-500'>
            <Link href='/account' className='flex items-center gap-1 px-[15px] py-[10px]'><LayoutDashboard size={18} /> Dashboard</Link>
            <div className='border-b-[1px]' />
            <Link href='/account' className='flex items-center gap-1 px-[15px] py-[10px]'><MapPinHouse size={18} /> Addresses</Link>
            <div className='border-b-[1px]' />
            <Link href='/account' className='flex items-center gap-1 px-[15px] py-[10px]'><IoMdHeartEmpty className='text-lg' /> Wishlist ({itemIds.length})</Link>
            <div className='border-b-[1px]' />
            <Link href='/account' className='flex items-center gap-1 px-[15px] py-[10px]'><PiShoppingCartSimple className='text-lg' /> Cart ({cartItems.length})</Link>
            <div className='border-b-[1px]' />
            <Link href='/account' className='flex items-center gap-1 px-[15px] py-[10px]'><FiLogOut className='text-lg' /> Logout</Link>
        </div>
    );
};

export default DashboardNav;