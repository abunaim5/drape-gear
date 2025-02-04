'use client';
import { ProductListType } from "@/types/types";
import Image from "next/image";
import { PiShoppingCartSimple } from "react-icons/pi";
import { IoMdHeartEmpty } from "react-icons/io";
import { useAppDispatch } from "@/lib/hooks";
import { addToWishlist } from "@/lib/features/wishlist/wishlistSlice";

const ProductCard = ({ _id, name, image, price }: ProductListType) => {
    const dispatch = useAppDispatch();
    console.log(_id);

    const handleAddToWishlist = (id: string) => {
        dispatch(addToWishlist(id));
    };

    return (
        <div className='border-none rounded-none'>
            <div className='relative group overflow-hidden border-[1px]'>
                <Image alt={`${name} image`} width={400} height={600} className='w-full h-full group-hover:scale-110 transform transition-transform ease-in-out duration-1000 cursor-pointer' src={image} />
                <div onClick={() => handleAddToWishlist(_id)} className='absolute left-3 top-3 text-xl cursor-pointer hover:animate-pulse'>
                    <IoMdHeartEmpty />
                </div>
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