'use client';
import { CartProductListType, ProductListType } from "@/types/types";
import Image from "next/image";
import { PiShoppingCartSimple, PiTrashLight, PiHeartStraightLight, PiHeartStraightFill } from "react-icons/pi";
import { HiOutlineEye } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addToWishlist, removeFromWishlist } from "@/lib/features/wishlist/wishlistSlice";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

const ProductCard = ({ _id, name, image, price, availability }: ProductListType) => {
    const wishlistItems = useAppSelector((state) => state.wishlist.itemIds);
    const { data: session } = useSession();
    const dispatch = useAppDispatch();
    const location = usePathname();
    const router = useRouter();

    const isWished = wishlistItems.includes(_id);

    // handle cart items
    const handleAddToCart = () => {
        if (!session?.user) {
            router.push('/login')
        } else {
            const cartProduct: CartProductListType = {
                productId: _id,
                email: session?.user.email ?? '',
                name: name,
                image: image,
                price: price,
                availability: availability,
                quantity: 1
            }
            dispatch(addToCart(cartProduct));
        }
    };

    // handle wishlist
    const handleAddToWishlist = (id: string) => {
        dispatch(addToWishlist(id));
    };

    const handleRemoveFromWishlist = (id: string) => {
        dispatch(removeFromWishlist(id));
    }

    return (
        <div className='group'>
            <div className='relative group overflow-hidden'>
                <div onClick={() => router.push(`/product/${_id}`)} className='absolute z-40 w-full h-full bg-black/5 group-hover:bg-black/10 group-hover:animate-in transform transition-transform ease-in duration-1000 cursor-pointer' />
                <Image onClick={() => router.push(`/product/${_id}`)} alt={`${name} image`} width={400} height={600} className='w-full h-full group-hover:scale-110 transform transition-transform ease-in-out duration-1000 cursor-pointer' src={image} />
                <div className='flex flex-col gap-1 absolute z-50 right-1 md:right-2 xl:right-4 bottom-1 md:bottom-2 xl:bottom-auto xl:top-4 text-xl'>
                    <button onClick={() => location === '/wishlist' ? handleRemoveFromWishlist(_id) : isWished ? router.push('/wishlist') : handleAddToWishlist(_id)} className={`group-hover:opacity-100 group-hover:animate-in transform transition-transform ease-linear duration-1000 ${location === '/wishlist' ? 'text-white' : 'text-black'} ${isWished ? 'bg-[#E81E63] hover:bg-[#E81E63] xl:opacity-100' : 'bg-white hover:bg-black xl:opacity-0'} hover:text-white p-2 rounded-sm`}>
                        {
                            location === '/wishlist' ? <PiTrashLight /> : isWished ? <PiHeartStraightFill className='text-white' /> : <PiHeartStraightLight />
                        }
                    </button>
                    <button className='xl:opacity-0 group-hover:opacity-100 group-hover:animate-in transform transition-transform ease-linear duration-1000 bg-white hover:bg-black hover:text-white p-2 rounded-sm'>
                        <HiOutlineEye />
                    </button>
                    <button onClick={handleAddToCart} className='xl:hidden bg-white hover:bg-black hover:text-white p-2 rounded-sm'>
                        <PiShoppingCartSimple />
                    </button>
                </div>
                <button onClick={handleAddToCart} className='hidden absolute z-50 left-1/2 bottom-4 -translate-x-1/2 text-xl opacity-0 group-hover:opacity-100 xl:flex items-center justify-center gap-2 group-hover:animate-in transform transition-transform ease-linear duration-1000 bg-white hover:bg-black hover:text-white px-4 py-2 rounded-sm'>
                    <PiShoppingCartSimple />
                    <span className='text-sm'>Add to cart</span>
                </button>
            </div>
            <div className='text-center p-3'>
                <Link href={`/product/${_id}`} className='transition-all duration-300 hover:text-cyan-500'>{name}</Link>
                <div className='flex items-center justify-center gap-3'>
                    <h3 className='text-sm text-[#F85712]'>&#2547;{price}</h3>
                    <h3 className='text-sm text-gray-400 line-through'>&#2547;{price}</h3>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;