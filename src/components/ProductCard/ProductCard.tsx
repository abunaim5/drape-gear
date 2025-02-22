'use client';
import { CartProductListType, ProductListType } from "@/types/types";
import Image from "next/image";
import { PiShoppingCartSimple, PiTrashLight, PiHeartStraightLight, PiHeartStraightFill } from "react-icons/pi";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addToWishlist, removeFromWishlist } from "@/lib/features/wishlist/wishlistSlice";
import { addToCart, removeFromCart } from "@/lib/features/cart/cartSlice";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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

    const handleRemoveFromCart = (id: string) => {
        if(session?.user?.email){
            dispatch(removeFromCart({id, email: session.user.email}));
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
        <div className=''>
            <div className='relative group overflow-hidden border-[1px]'>
                <Image onClick={() => router.push(`/product/${_id}`)} alt={`${name} image`} width={400} height={600} className='w-full h-full group-hover:scale-110 transform transition-transform ease-in-out duration-1000 cursor-pointer' src={image} />
                <button onClick={() => location === '/wishlist' ? handleRemoveFromWishlist(_id) : isWished ? router.push('/wishlist') : handleAddToWishlist(_id)} className='absolute left-3 top-3 text-xl cursor-pointer hover:animate-pulse'>
                    {
                        location === '/wishlist' ? <PiTrashLight /> : isWished ? <PiHeartStraightFill className='text-red-500' /> : <PiHeartStraightLight />
                    }
                </button>
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
                    <div onClick={() => location !== '/cart' ? handleAddToCart() : handleRemoveFromCart(_id)} className='cursor-pointer'>
                        {
                            location !== '/cart' ? <PiShoppingCartSimple /> : <PiTrashLight />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;