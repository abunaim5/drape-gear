import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const DrawerCard = ({ id, name, image, sale_price }: { id: string, name: string, image: string, sale_price: number }) => {
    return (
        <div className='flex items-center gap-3 shadow-sm'>
            <Image alt={`${name} image`} width={96} height={96} className=' cursor-pointer' src={image} />
            <div className='pr-3 h-full'>
                <Link href={`/product/${id}`} className='text-base font-bold text-gray-600 transition-all duration-300 hover:text-cyan-500'>{name}</Link>
                <p className='mt-2'>${sale_price}</p>
            </div>
        </div>
    );
};

export default DrawerCard;