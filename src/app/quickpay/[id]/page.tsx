'use client'
import CheckoutForm from "@/components/CheckoutForm/CheckoutForm";
import { fetchSingleProduct } from "@/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect } from "react";

type ProductId = {
    params: Promise<{ id: string }>
}

const QuickPay = ({ params }: ProductId) => {
    const { product } = useAppSelector((state) => state.products);
    const dispatch = useAppDispatch();
    const { id } = use(params);

    useEffect(() => {
        dispatch(fetchSingleProduct(id))
    }, [dispatch, id]);

    if (!product) {
        return <div className='container'>
            Product Not found.
        </div>
    }

    return (
        <div className='min-h-screen'>
            <div className='py-6 border-b'>
                <div className='max-w-[1180px] mx-auto px-4 md:px-10 flex items-center justify-between'>
                    <h3 className='text-base md:text-lg font-semibold'>Gear your payment and enjoy!</h3>
                    <Link href='/cart' className='transition-all duration-300 text-[#1773B0] hover:text-blue-700'><ShoppingBag /></Link>
                </div>
            </div>
            <div className='max-w-[1180px] mx-auto flex flex-col-reverse lg:flex-row'>
                <div className='flex-1 min-h-[calc(100vh-70px)] lg:border-r px-4 md:p-10'>
                    <CheckoutForm />
                </div>
                <div className='flex-1 space-y-3 px-4 py-10 md:p-10'>
                    <div className='flex items-center justify-between gap-2 text-sm'>
                        <div className='flex items-center gap-3'>
                            <div className='relative'>
                                <Image className='border rounded-sm' width={80} height={80} src={product.image} alt={`${product.name} image`} />
                                <div className='absolute -top-1 -right-1.5 min-w-5 min-h-5 rounded-full flex items-center justify-center text-[10px] leading-none text-white bg-gray-600'>1</div>
                            </div>
                            <span>{product.name}</span>
                        </div>
                        <p>${product.price}.00</p>
                    </div>
                    <div className='border-b' />
                    <div className='flex items-center justify-between gap-2 text-sm font-semibold'>Subtotal.1 items <span>${product.price}.00</span></div>
                </div>
            </div>
        </div>
    );
};

export default QuickPay;