'use client';
import { CartProductListType, ProductResponseType } from "@/types/types";
import Image from "next/image";
import { PiShoppingCartSimple, PiTrashLight, PiHeartStraightLight, PiHeartStraightFill } from "react-icons/pi";
import { HiOutlineEye } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addToWishlist, removeFromWishlist } from "@/lib/features/wishlist/wishlistSlice";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react";
import ProductDetails from "../ProductDetails/ProductDetails";
import toast from "react-hot-toast";

const ProductCard = ({ _id, name, image, old_price, sale_price, availability, category, collection, description, createdAt }: ProductResponseType) => {
    const wishlistItems = useAppSelector((state) => state.wishlist.itemIds);
    const { cart } = useAppSelector((state) => state.cart);
    const [openQuick, setOpenQuick] = useState<boolean>(false);
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
                old_price: old_price,
                sale_price: sale_price,
                availability: availability,
                quantity: 1
            }
            dispatch(addToCart(cartProduct));
            if (cart.success) {
                toast.success('Nice pick! It’s in your cart now.');
            }
        }
    };

    // handle wishlist
    const handleAddToWishlist = (id: string) => {
        dispatch(addToWishlist(id));
    };

    const handleRemoveFromWishlist = (id: string) => {
        dispatch(removeFromWishlist(id));
    };

    const handleQuickView = () => {
        setOpenQuick(true);
    };

    return (
        <>
            <Dialog open={openQuick} onOpenChange={() => setOpenQuick(!openQuick)}>
                <DialogContent className='sm:max-w-max max-h-[80vh] md:max-h-max overflow-auto sm:rounded-none p-0' aria-describedby=''>
                    <DialogTitle className='sr-only'>Product Quick Details</DialogTitle>
                    <div>
                        <ProductDetails
                            _id={_id}
                            name={name}
                            old_price={old_price}
                            sale_price={sale_price}
                            image={image}
                            category={category}
                            collection={collection}
                            createdAt={createdAt}
                            description={description}
                            availability={availability}
                        />
                    </div>
                </DialogContent>
            </Dialog>
            <div className='group'>
                <div className='relative group overflow-hidden'>
                    <div onClick={() => router.push(`/product/${_id}`)} className='absolute z-40 w-full h-full bg-black/5 group-hover:bg-black/10 group-hover:animate-in transform transition-transform ease-in duration-1000 cursor-pointer' />
                    <Image onClick={() => router.push(`/product/${_id}`)} alt={`${name} image`} width={400} height={600} className='w-full h-full group-hover:scale-110 transform transition-transform ease-in-out duration-1000 cursor-pointer' src={image} />
                    <div className='flex flex-col gap-1 absolute z-50 right-1 md:right-2 xl:right-4 bottom-1 md:bottom-2 xl:bottom-auto xl:top-4 text-xl'>
                        <button onClick={() => location === '/wishlist' ? handleRemoveFromWishlist(_id) : isWished ? router.push('/wishlist') : handleAddToWishlist(_id)} className={`group-hover:opacity-100 group-hover:animate-in transform transition-all ease-linear duration-500 ${location === '/wishlist' ? 'text-white' : 'text-black'} ${isWished ? 'bg-[#E81E63] hover:bg-[#E81E63] xl:opacity-100' : 'bg-white hover:bg-black xl:opacity-0'} hover:text-white p-2 rounded-sm`}>
                            {
                                location === '/wishlist' ? <PiTrashLight /> : isWished ? <PiHeartStraightFill className='text-white' /> : <PiHeartStraightLight />
                            }
                        </button>
                        <button onClick={handleQuickView} className='xl:opacity-0 group-hover:opacity-100 group-hover:animate-in transform transition-all ease-linear duration-500 bg-white hover:bg-black hover:text-white p-2 rounded-sm'>
                            <HiOutlineEye />
                        </button>
                        <button onClick={handleAddToCart} className='xl:hidden bg-white hover:bg-black hover:text-white p-2 rounded-sm transform transition-all duration-500'>
                            <PiShoppingCartSimple />
                        </button>
                    </div>
                    <button onClick={handleAddToCart} className='hidden absolute z-50 left-1/2 bottom-4 -translate-x-1/2 text-xl opacity-0 group-hover:opacity-100 xl:flex items-center justify-center gap-2 group-hover:animate-in transform transition-all duration-500 ease-linear bg-white hover:bg-black hover:text-white px-4 py-2 rounded-sm'>
                        <PiShoppingCartSimple />
                        <span className='text-sm'>Add to cart</span>
                    </button>
                </div>
                <div className='text-center p-3'>
                    <Link href={`/product/${_id}`} className='transition-all duration-300 hover:text-cyan-500'>{name}</Link>
                    <div className='flex items-center justify-center gap-3'>
                        <h3 className='text-sm text-[#F85712]'>${sale_price}</h3>
                        <h3 className='text-sm text-gray-400 line-through'>${old_price}</h3>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCard;