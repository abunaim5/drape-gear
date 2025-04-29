'use client'
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { fetchCartProducts, removeFromCart, updateCartQuantity } from "@/lib/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { CartProductListType } from "@/types/types";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { PiTrashLight } from "react-icons/pi";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaTruckFast } from "react-icons/fa6";

const Cart = () => {
    const { cart } = useAppSelector((state) => state.cart);
    console.log(cart)
    const { data: session } = useSession();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const subtotalPrice = cart.products.reduce((total, item) => total + item.sale_price * item.quantity, 0);

    useEffect(() => {
        if (session?.user?.email) {
            dispatch(fetchCartProducts({ email: session.user.email }));
        }
    }, [dispatch, session?.user?.email]);

    const handleRemoveFromCart = (id: string) => {
        if (session?.user?.email) {
            dispatch(removeFromCart({ id, email: session.user.email }));
            if (cart.success) {
                toast.success('Item removed from cart.');
            }
        }
    };

    const handleUpdateProductQuantity = ({ id, email, productQuantity }: { id: string, email: string, productQuantity: number }) => {
        if (session?.user?.email) {
            dispatch(updateCartQuantity({ id, email, productQuantity }));
        }
    }

    // if (loading) {
    //     return <p>Loading...</p>
    // }

    return (
        <>
            <Breadcrumb />
            <div className='container min-h-[calc(100vh-260px)] content-center'>
                {
                    cart.products.length ? (<div className='my-8 lg:my-16'>
                        <div className={`hidden items-center justify-between text-sm font-semibold pb-3 ${!cart.products.length ? 'hidden' : 'xl:flex'}`}>
                            <h3 className='w-1/4'>Product</h3>
                            <div className='flex items-center justify-between flex-1'>
                                <h3 className='flex-1 text-center'>Price</h3>
                                <h3 className='flex-1 text-center'>Quantity</h3>
                                <h3 className='flex-1 text-right'>Total</h3>
                            </div>
                        </div>
                        {
                            cart.products.map((product: CartProductListType, idx) => <div key={idx} className='mt-5 xl:mt-0'>
                                <div className={`flex items-center gap-3 border xl:border-0 ${cart.products.length === 1 ? 'xl:border-b' : 'xl:border-b-0'} xl:border-t font-semibold py-5 md:py-0`}>
                                    <Image className='block xl:hidden' alt={`${product.name} image`} src={product.image} width={120} height={200} />
                                    <div className='xl:flex items-center justify-between flex-1'>
                                        <div className='w-full md:w-1/4 block xl:flex items-center gap-3'>
                                            <Image className='hidden xl:block' alt={`${product.name} image`} src={product.image} width={120} height={200} />
                                            <div className='flex-1'>
                                                <h4 className='text-sm'>{product.name}</h4>
                                                <button onClick={() => handleRemoveFromCart(product.productId)} className='text-xl mt-2'><PiTrashLight /></button>
                                            </div>
                                        </div>
                                        <div className='block md:hidden border-b border-dashed my-2' />
                                        <div className='xl:flex items-center justify-between flex-1 font-normal block md:hidden'>
                                            <div className='flex items-center xl:justify-center gap-3 flex-1'>
                                                <h3 className='text-sm text-gray-400 line-through'>${product.old_price}</h3>
                                                <h3 className='text-sm text-[#F85712]'>${product.sale_price}</h3>
                                            </div>
                                            <div className='block md:hidden border-b border-dashed my-2' />
                                            <div className='flex-1'>
                                                <div className='flex items-center gap-6 xl:mx-auto max-w-max text-lg font-semibold px-3 py-[5px] border border-black'>
                                                    <button onClick={() => handleUpdateProductQuantity({ id: product.productId, email: product.email, productQuantity: product.quantity - 1 })} className={`hover:text-cyan-500 ${product.quantity <= 1 ? 'pointer-events-none' : ''}`}><Minus size={20} /></button>
                                                    <span>{product.quantity}</span>
                                                    <button onClick={() => handleUpdateProductQuantity({ id: product.productId, email: product.email, productQuantity: product.quantity + 1 })} className='hover:text-cyan-500'><Plus size={20} /></button>
                                                </div>
                                            </div>
                                            <div className='block md:hidden border-b border-dashed my-2' />
                                            <h5 className='text-sm flex-1 xl:text-right'>${product.sale_price * product.quantity}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className='hidden md:flex xl:hidden items-center justify-between border border-t-0 px-2 py-4'>
                                    <div className='flex items-center justify-center gap-3 flex-1'>
                                        <h3 className='text-sm text-gray-400 line-through'>${product.old_price}</h3>
                                        <h3 className='text-sm text-[#F85712]'>${product.sale_price}</h3>
                                    </div>
                                    <div className='flex-1 px-2'>
                                        <div className='flex items-center gap-6 mx-auto max-w-max text-lg font-semibold px-3 py-[5px] border border-black'>
                                            <button onClick={() => handleUpdateProductQuantity({ id: product.productId, email: product.email, productQuantity: product.quantity - 1 })} className={`hover:text-cyan-500 ${product.quantity <= 1 ? 'pointer-events-none' : ''}`}><Minus size={20} /></button>
                                            <span>{product.quantity}</span>
                                            <button onClick={() => handleUpdateProductQuantity({ id: product.productId, email: product.email, productQuantity: product.quantity + 1 })} className='hover:text-cyan-500'><Plus size={20} /></button>
                                        </div>
                                    </div>
                                    <h5 className='flex-1 text-center text-sm'>${product.sale_price * product.quantity}</h5>
                                </div>
                            </div>)
                        }
                        <div className={`flex flex-col items-center md:items-end mt-10 ${!cart.products.length ? 'hidden' : 'block'}`}>
                            <h6 className='text-[13px]'><span className='text-green-800'>Congratulations!</span> You&apos;ve got free shipping!</h6>
                            <div className='relative my-4 w-full'>
                                <FaTruckFast className='absolute right-0 -top-5 text-3xl z-30 text-green-800/95' />
                                <div className='w-full md:w-[330px] lg:w-[420px] place-self-end bg-gray-200 rounded-lg overflow-hidden'>
                                    <div className='h-2 bg-striped bg-[length:40px_40px] animate-stripe-move rounded-lg' />
                                </div>
                            </div>
                            <h1 className='text-lg font-semibold mt-6 md:mt-0'><span className='mr-5 text-lg'>SUBTOTAL:</span> ${subtotalPrice}</h1>
                            <p className='text-sm my-3 text-gray-500'>Taxes and shipping calculated at checkout</p>
                            <form className='flex items-center space-x-2 text-gray-500 text-sm'>
                                <Checkbox id="terms" className='rounded-none' />
                                <Label htmlFor="terms" className='text-sm font-normal text-gray-500'>I agree with the terms and conditions.</Label>
                            </form>
                            <button onClick={() => router.push('/payment')} className='w-full md:w-[152px] text-sm mt-5 py-2 md:py-3 lg:py-[14px] transition-all duration-500 bg-cyan-500 text-white hover:bg-cyan-600'>
                                Check Out
                            </button>
                        </div>
                    </div>) : (<div className='flex flex-col items-center justify-center gap-6 my-4'>
                        <Image width={150} height={150} alt='wishlist empty' src='/icons/wishlist-empty.png' />
                        <h3 className='text-3xl font-semibold'>Wishlist is empty.</h3>
                        <p className='text-sm text-gray-500'>You don&apos;t have any products in the wishlist yet. You will find a lot of interesting products on our &quot;Shop&quot; page.</p>
                    </div>)
                }
            </div>
        </>
    );
};

export default Cart;