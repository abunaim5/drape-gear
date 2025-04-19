'use client';
import { fetchSingleProduct } from '@/lib/features/products/productsSlice';
import { fetchCartProducts } from '@/lib/features/cart/cartSlice';
import CheckoutForm from '@/components/CheckoutForm/CheckoutForm';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { CartProductListType, OrderedProductsType } from '@/types/types';
import { useSearchParams } from 'next/navigation';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from 'next-auth/react';
import { ShoppingBag } from 'lucide-react';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Payment = () => {
    const { product, loading } = useAppSelector((state) => state.products);
    const { cart } = useAppSelector((state) => state.cart);
    const searchParams = useSearchParams();
    const productId = searchParams.get('id') as string;
    const { data: session } = useSession();
    const dispatch = useAppDispatch();
    const subtotalPrice = cart.products.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalItems = cart.products.reduce((total, item) => total + item.quantity, 0);
    const totalAmount = !productId ? subtotalPrice : product?.price ?? 0;
    let orderedProducts: OrderedProductsType[];

    if (!productId) {
        orderedProducts = cart.products.map(item => ({
            productId: item.productId,
            name: item.name,
            image: item.image,
            quantity: item.quantity,
            priceAtPurchase: item.price
        }));
    } else {
        orderedProducts = [
            {
                productId: product?._id ?? '',
                name: product?.name ?? '',
                image: product?.image ?? '',
                quantity: 1,
                priceAtPurchase: product?.price ?? 0
            }
        ];
    };

    useEffect(() => {
        if (session?.user?.email && !productId) {
            dispatch(fetchCartProducts({ email: session.user.email }));
        } else {
            dispatch(fetchSingleProduct(productId));
        }
    }, [dispatch, session?.user?.email, productId]);

    if (loading) return

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
                    <Elements stripe={stripePromise}>
                        <CheckoutForm orderedProducts={orderedProducts} totalAmount={totalAmount} />
                    </Elements>
                </div>
                <div className='flex-1 space-y-3 px-4 py-10 md:p-10'>
                    {
                        productId ? !product ? <h1>product not found</h1> : (<div className='flex items-center justify-between gap-2 text-sm'>
                            <div className='flex items-center gap-3'>
                                <div className='relative'>
                                    <Image className='border rounded-sm' width={80} height={80} src={product.image} alt={`${product.name} image`} />
                                    <div className='absolute -top-1 -right-1.5 min-w-5 min-h-5 rounded-full flex items-center justify-center text-[10px] leading-none text-white bg-gray-600'>1</div>
                                </div>
                                <span>{product.name}</span>
                            </div>
                            <p>${product.price}.00</p>
                        </div>) : (cart.products.map((product: CartProductListType, idx) => <div key={idx} className='flex items-center justify-between gap-2 text-sm'>
                            <div className='flex items-center gap-3'>
                                <div className='relative'>
                                    <Image className='border rounded-sm' width={80} height={80} src={product.image} alt={`${product.name} image`} />
                                    <div className='absolute -top-1 -right-1.5 min-w-5 min-h-5 rounded-full flex items-center justify-center text-[10px] leading-none text-white bg-gray-600'>{product.quantity}</div>
                                </div>
                                <span>{product.name}</span>
                            </div>
                            <p>${product.price}.00</p>
                        </div>))
                    }
                    <div className='border-b bg-black' />
                    <div className='flex items-center justify-between gap-2 text-sm font-semibold'>Subtotal.{productId ? 1 : totalItems} items <span>${productId ? product?.price : subtotalPrice}.00</span></div>
                </div>
            </div>
        </div>
    );
};

export default Payment;