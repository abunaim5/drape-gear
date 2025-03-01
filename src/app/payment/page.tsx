import { ShoppingBag } from 'lucide-react';
import React from 'react';

const Payment = () => {
    return (
        <div>
            <div className='py-6 border-b'>
                <div className='container flex items-center justify-between'>
                    <h3 className='font-semibold'>Let&apos;s gear your payment and enjoy.</h3>
                    <ShoppingBag />
                </div>
            </div>
        </div>
    );
};

export default Payment;