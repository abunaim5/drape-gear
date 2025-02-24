'use client'
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { fetchCartProducts } from "@/lib/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { CartProductListType } from "@/types/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { PiTrashLight } from "react-icons/pi";

const Cart = () => {
    const { loading, cartItems } = useAppSelector((state) => state.cart);
    const [count, setCount] = useState<number>(1);
    const { data: session } = useSession();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (session?.user?.email) {
            dispatch(fetchCartProducts({ email: session.user.email }));
        }
    }, [dispatch, session?.user?.email]);

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <>
            <Breadcrumb />
            <div className='container min-h-[calc(100vh-268px)] mt-16 mb-20'>
                <div className='hidden xl:flex items-center justify-between text-sm font-semibold pb-3 px-2'>
                    <h3 className='w-[233px]'>Product</h3>
                    <div className='flex items-center justify-between flex-1'>
                        <h3 className='flex-1 text-center'>Price</h3>
                        <h3 className='flex-1 text-center'>Quantity</h3>
                        <h3 className='flex-1 text-right'>Total</h3>
                    </div>
                </div>
                {
                    cartItems.map((product: CartProductListType, idx) => <div key={idx} className='mt-5 xl:mt-0'>
                        <div className={`flex items-center gap-3 border xl:border-0 ${cartItems.length === 1 ? 'xl:border-b' : 'xl:border-b-0'} xl:border-t font-semibold py-5 md:py-0`}>
                            <Image alt={`${product.name} image`} src={product.image} width={120} height={200} />
                            <div className='xl:flex items-center justify-between flex-1'>
                                <div>
                                    <h4 className='text-sm'>{product.name}</h4>
                                    <button className='text-xl mt-2'><PiTrashLight /></button>
                                </div>
                                <div className='block md:hidden border-b border-dashed my-2' />
                                <div className='xl:flex items-center justify-between flex-1 font-normal block md:hidden xl:pr-2'>
                                    <div className='flex items-center xl:justify-center gap-3 flex-1'>
                                        <h3 className='text-sm text-gray-400 line-through'>&#2547;{product.price}</h3>
                                        <h3 className='text-sm text-[#F85712]'>&#2547;{product.price}</h3>
                                    </div>
                                    <div className='block md:hidden border-b border-dashed my-2' />
                                    <div className='flex-1'>
                                        <div className='flex items-center gap-6 xl:mx-auto max-w-max text-lg font-semibold px-3 py-[5px] border border-black'>
                                            <button onClick={() => setCount(count - 1)} className={`hover:text-cyan-500 ${count === 1 ? 'pointer-events-none' : ''}`}><Minus size={20} /></button>
                                            <span>{product?.quantity ? product.quantity : count}</span>
                                            <button onClick={() => setCount(count + 1)} className='hover:text-cyan-500'><Plus size={20} /></button>
                                        </div>
                                    </div>
                                    <div className='block md:hidden border-b border-dashed my-2' />
                                    <h5 className='text-sm flex-1 xl:text-right'>&#2547;{product.price}</h5>
                                </div>
                            </div>
                        </div>
                        <div className='hidden md:flex xl:hidden items-center justify-between border border-t-0 px-2 py-4'>
                            <div className='flex items-center justify-center gap-3 flex-1'>
                                <h3 className='text-sm text-gray-400 line-through'>&#2547;{product.price}</h3>
                                <h3 className='text-sm text-[#F85712]'>&#2547;{product.price}</h3>
                            </div>
                            <div className='flex-1 px-2'>
                                <div className='flex items-center gap-6 mx-auto max-w-max text-lg font-semibold px-3 py-[5px] border border-black'>
                                    <button onClick={() => setCount(count - 1)} className={`hover:text-cyan-500 ${count === 1 ? 'pointer-events-none' : ''}`}><Minus size={20} /></button>
                                    <span>{product?.quantity ? product.quantity : count}</span>
                                    <button onClick={() => setCount(count + 1)} className='hover:text-cyan-500'><Plus size={20} /></button>
                                </div>
                            </div>
                            <h5 className='flex-1 text-center text-sm'>&#2547;{product.price}</h5>
                        </div>
                    </div>)
                }
            </div>
        </>
    );
};

export default Cart;