'use client'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Link from 'next/link';
import React from 'react';

const Account = () => {
    return (
        <>
            <Breadcrumb />
            <div className='container min-h-[calc(100vh-268px)] mb-20'>
                <div className='border'>
                    <Link href='/account' className='py-[10px] px-[15px]'>Dashboard</Link>
                </div>
            </div>
        </>
    );
};

export default Account;