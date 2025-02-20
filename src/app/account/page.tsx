'use client'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import DashboardNav from '@/components/DashboardNav/DashboardNav';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { IoIosCheckmarkCircle } from 'react-icons/io';

const Account = () => {
    const { data: session } = useSession();

    return (
        <>
            <Breadcrumb />
            <div className='container min-h-[calc(100vh-412px)] mb-20'>
                <div className='flex gap-8 mt-16'>
                    <DashboardNav />
                    <div className='flex-1'>
                        <h4 className='text-sm mb-5 text-gray-500'>Hello <span className='font-semibold'>{session?.user.name}</span></h4>
                        <h3 className='font-semibold mb-4'>Order History:</h3>
                        <div className='flex items-center gap-2'>
                            <IoIosCheckmarkCircle className='text-green-600' />
                            <span><Link href='/shop' className='underline text-gray-500'>Make your first order</Link> You haven&apos;t placed any order yet.</span>
                        </div>
                        <div className='mt-14'>
                            <h3 className='font-semibold mb-4'>Account details:</h3>
                            <p className='text-sm text-gray-500 mb-1'>{session?.user.name}</p>
                            <p className='text-sm text-gray-500'>United States</p>
                        </div>
                        <div className='flex text-sm mt-5 text-gray-500'>
                            <div className='w-[500px] border font-semibold'>
                                <h4 className='p-[10px]'>Name:</h4>
                                <div className='border-b-[1px]' />
                                <h4 className='p-[10px]'>Email:</h4>
                                <div className='border-b-[1px]' />
                                <h4 className='p-[10px]'>Address:</h4>
                                <div className='border-b-[1px]' />
                                <h4 className='p-[10px]'>Address 2:</h4>
                            </div>
                            <div className='flex-1 border border-l-0'>
                                <h4 className='p-[10px]'>{session?.user.name}</h4>
                                <div className='border-b-[1px]' />
                                <h4 className='p-[10px]'>{session?.user.email}</h4>
                                <div className='border-b-[1px]' />
                                <h4 className='p-[10px]'>United States</h4>
                                <div className='border-b-[1px]' />
                                <h4 className='p-[10px]'></h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Account;