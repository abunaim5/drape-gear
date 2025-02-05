'use client';
import { ProductListType } from "@/types/types";
import Image from "next/image";
import { PiShoppingCartSimple, PiTrashLight } from "react-icons/pi";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addToWishlist, removeFromWishlist } from "@/lib/features/wishlist/wishlistSlice";
import { usePathname } from "next/navigation";

const ProductCard = ({ _id, name, image, price }: ProductListType) => {
    const wishlistItems = useAppSelector((state) => state.wishlist.itemIds);
    const dispatch = useAppDispatch();
    const location = usePathname();

    const isWished = wishlistItems.includes(_id);

    const handleAddToWishlist = (id: string) => {
        dispatch(addToWishlist(id));
    };

    const handleRemoveFromWishlist = (id: string) => {
        dispatch(removeFromWishlist(id));
    }

    return (
        <div className=''>
            <div className='relative group overflow-hidden border-[1px]'>
                <Image alt={`${name} image`} width={400} height={600} className='w-full h-full group-hover:scale-110 transform transition-transform ease-in-out duration-1000 cursor-pointer' src={image} />
                <div onClick={() => location !== '/wishlist' ? handleAddToWishlist(_id) : handleRemoveFromWishlist(_id)} className='absolute left-3 top-3 text-xl cursor-pointer hover:animate-pulse'>
                    {

                        location === '/wishlist' ? <PiTrashLight /> : isWished ? <IoMdHeart className='text-red-500' /> : <IoMdHeartEmpty />
                    }
                </div>
            </div>
            <div className='flex items-center justify-between border-[1px] p-3 mt-[10px]'>
                <div>
                    <h1 className='hover:text-cyan-500 cursor-pointer'>{name}</h1>
                    <div className='flex items-center gap-3'>
                        <h3 className='text-sm text-[#F85712]'>&#2547;{price}</h3>
                        <h3 className='text-sm text-gray-400 line-through'>&#2547;{price}</h3>
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