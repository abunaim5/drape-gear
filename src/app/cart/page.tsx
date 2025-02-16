'use client'
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import ProductCard from "@/components/ProductCard/ProductCard";
import { fetchCartProducts } from "@/lib/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { CartProductListType } from "@/types/types";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const Cart = () => {
    const { cartItems } = useAppSelector((state) => state.cart);
    const { data: session } = useSession();
    const dispatch = useAppDispatch();
    console.log(cartItems);

    useEffect(() => {
        dispatch(fetchCartProducts({ email: session?.user.email ?? '' }))
    }, [dispatch, session?.user.email]);

    return (
        <>
            <Breadcrumb />
            <div className='container min-h-[calc(100vh-268px)] mb-20'>
                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-16'>
                    {
                        cartItems.map((product: CartProductListType, idx: number) => <ProductCard key={idx} _id={product.productId} name={product.name} image={product.image} price={product.price} availability={product?.availability} />)
                    }
                </div>
            </div>
        </>
    );
};

export default Cart;