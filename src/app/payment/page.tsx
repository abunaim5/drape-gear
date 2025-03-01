'use client'
import CheckoutForm from '@/components/CheckoutForm/CheckoutForm';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

const Payment = () => {
    return (
        <>
            <div className='py-6 border-b'>
                <div className='container flex items-center justify-between'>
                    <h3 className='text-base md:text-lg font-semibold'>Gear your payment and enjoy!</h3>
                    <Link href='/cart' className='transition-all duration-300 text-blue-600 hover:text-blue-700'><ShoppingBag /></Link>
                </div>
            </div>
            <div className='container mt-10'>
                <CheckoutForm />
            </div>
        </>
    );
};

export default Payment;