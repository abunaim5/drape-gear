'use client'
import CheckoutForm from '@/components/CheckoutForm/CheckoutForm';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

const Payment = () => {
    return (
        <>
            <div className='py-6 border-b'>
                <div className='container px-10 flex items-center justify-between'>
                    <h3 className='text-base md:text-lg font-semibold'>Gear your payment and enjoy!</h3>
                    <Link href='/cart' className='transition-all duration-300 text-blue-600 hover:text-blue-700'><ShoppingBag /></Link>
                </div>
            </div>
            <div className='container flex flex-col-reverse lg:flex-row'>
                <div className='flex-1 lg:border-r md:p-10'>
                    <CheckoutForm />
                </div>
                <div className='flex-1 bg-[#F5F5F5] md:p-10'>
                    <h1>Order history</h1>
                </div>
            </div>
        </>
    );
};

export default Payment;