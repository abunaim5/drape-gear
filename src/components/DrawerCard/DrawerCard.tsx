import Image from 'next/image';
import React from 'react';

const DrawerCard = ({ name, image, sale_price }: { name: string, image: string, sale_price: number }) => {
    return (
        <div className='flex items-center gap-3 shadow-sm'>
            <Image alt={`${name} image`} width={96} height={96} className=' cursor-pointer' src={image} />
            <div className='pr-3 h-full'>
                <h1 className='text-base font-bold hover:text-[#00BADB] cursor-pointer text-gray-600'>{name}</h1>
                <p className='mt-2'>${sale_price}</p>
            </div>
        </div>
    );
};

export default DrawerCard;