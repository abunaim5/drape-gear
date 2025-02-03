'use client';
import { productListType } from "@/types/types";
import Image from "next/image";
import { PiShoppingCartSimple } from "react-icons/pi";

const ProductCard = ({name, image, price} : productListType) => {

    return (
        <div className='border-none rounded-none'>
            <div className='overflow-hidden border-[1px]' style={{ borderRadius: 0 }}>
                <Image alt={`${name} image`} width={400} height={600} className='w-full h-full hover:scale-110 transform transition-transform ease-in-out duration-1000 cursor-pointer' src={image} />
            </div>
            <div className='flex items-center justify-between border-[1px] p-3 mt-4'>
                <div>
                    <h1 className='text-lg hover:text-cyan-500 cursor-pointer'>{name}</h1>
                    <div className='flex items-center gap-3'>
                        <h3 className='text-base'>&#2547;{price}</h3>
                        <h3 className='text-base text-gray-400 line-through'>&#2547;{price}</h3>
                    </div>
                </div>
                <div className='flex items-center gap-3 text-xl'>
                    <div className='border-r-[1px] h-10' />
                    <PiShoppingCartSimple className='cursor-pointer' />
                </div>
            </div>
        </div>
    );
};

export default ProductCard;