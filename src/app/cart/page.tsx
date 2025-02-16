'use client'
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { fetchCartProducts } from "@/lib/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const Cart = () => {
    const { cartItems } = useAppSelector((state) => state.cart);
    const { data: session } = useSession();
    const dispatch = useAppDispatch();
    console.log(cartItems);

    useEffect(() => {
        dispatch(fetchCartProducts({email: session?.user.email ?? ''}))
    }, [dispatch, session?.user.email]);

    return (
        <>
            <Breadcrumb />
            <div className='container min-h-[calc(100vh-268px)] mb-20'>
                <p>this is cart page</p>
            </div>
        </>
    );
};

export default Cart;