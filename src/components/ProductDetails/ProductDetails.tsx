import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaPinterestP, FaTelegramPlane, FaTumblr } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { CartProductListType, ProductType } from "@/types/types";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { PiHeartStraightFill, PiHeartStraightLight } from "react-icons/pi";
import { addToWishlist } from "@/lib/features/wishlist/wishlistSlice";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { addToCart } from "@/lib/features/cart/cartSlice";

const ProductDetails = ({ _id, name, image, price, description, availability, category, collection }: ProductType) => {
    const wishlistItems = useAppSelector((state) => state.wishlist.itemIds);
    const { data: session } = useSession();
    const dispatch = useAppDispatch();
    const pathname = usePathname();
    const router = useRouter();
    const [count, setCount] = useState<number>(1);
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
                quantity: count
            }
            dispatch(addToCart(cartProduct));
        }
    };

    // handle wishlist
    const handleAddToWishlist = (id: string) => {
        dispatch(addToWishlist(id));
    };

    return (
        <>
            <div className={`flex flex-col md:flex-row gap-8 ${pathname !== `/product/${_id}` ? 'p-4 md:p-0' : ''}`}>
                <div className='relative flex-1 flex items-center'>
                    <div className='absolute z-50 w-full h-full bg-black/5 cursor-grab' />
                    <Image className='w-full' alt={`${name} image`} src={image} width={400} height={500} />
                </div>
                <div className={`flex-1 ${pathname !== `/product/${_id}` ? 'py-0 md:py-8 pr-0 md:pr-8' : ''}`}>
                    <h3 className='font-semibold'>{name}</h3>
                    <div className='flex items-center gap-3 text-xl mt-2'>
                        <h5 className='text-gray-400 line-through'>&#2547;{price}</h5>
                        <h5 className='text-[#F85712]'>&#2547;{price}</h5>
                    </div>
                    <p className='text-sm my-5 text-gray-500'>{description}</p>
                    <div className='flex gap-3 justify-normal lg:justify-between max-w-[342px]'>
                        <div className='flex items-center gap-4 max-w-max text-lg font-semibold px-4 py-[7px] rounded-full border border-black'>
                            <button onClick={() => setCount(count - 1)} className={`hover:text-cyan-500 transition-all duration-500 ${count === 1 ? 'pointer-events-none' : ''}`}><Minus size={20} /></button>
                            <span className='text-base'>{count}</span>
                            <button onClick={() => setCount(count + 1)} className='hover:text-cyan-500 transition-all duration-500'><Plus size={20} /></button>
                        </div>
                        <button onClick={handleAddToCart} className='px-9 py-[10px] bg-cyan-500 hover:bg-cyan-600 text-white rounded-full text-sm animate-bounce hidden lg:block transition-all duration-500'>ADD TO CART</button>
                        <button onClick={() => isWished ? router.push('/wishlist') : handleAddToWishlist(_id)} className={`w-10 h-10 flex items-center justify-center rounded-full border text-xl border-black transition-all duration-500 ${isWished ? 'text-red-500 border-red-500 hover:text-red-500 hover:border-red-500' : 'text-black border-black hover:text-cyan-500 hover:border-cyan-500'}`}>
                            {
                                isWished ? <PiHeartStraightFill /> : <PiHeartStraightLight />
                            }
                        </button>
                    </div>
                    <button onClick={handleAddToCart} className='w-full lg:w-[342px] py-[10px] mt-5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full text-sm animate-bounce lg:hidden transition-all duration-500'>ADD TO CART</button>
                    <button onClick={() => router.push(`/payment?id=${_id}`)} className='w-full lg:w-[342px] py-[10px] mt-5 bg-black hover:bg-cyan-500 text-white rounded-full text-sm transition-all duration-500'>BUY IT NOW</button>
                    <div className='flex gap-5 text-sm font-semibold mt-10'>
                        <Link href='/' className='hover:text-cyan-500'>Delivery & Return</Link>
                        <Link href='/' className='hover:text-cyan-500'>Ask a Question</Link>
                    </div>
                    <div className='flex flex-col gap-2 text-sm mt-5'>
                        <p><span className='text-gray-500'>SKU:</span> FS-26</p>
                        <p><span className='text-gray-500'>Availability:</span> {availability === true ? 'In Stock' : 'Out of Stock'}</p>
                        <p><span className='text-gray-500'>Category:</span> {category}</p>
                        <p><span className='text-gray-500'>Tags:</span> {category}, {collection}</p>
                    </div>
                    <div className='flex items-center gap-5 text-lg mt-5'>
                        <Link href='/'><FaFacebookF /></Link>
                        <Link href='/'><FaXTwitter /></Link>
                        <Link href='/'><FaPinterestP /></Link>
                        <Link href='/'><FaTumblr /></Link>
                        <Link href='/'><FaTelegramPlane /></Link>
                        <Link href='/'><SiGmail /></Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetails;