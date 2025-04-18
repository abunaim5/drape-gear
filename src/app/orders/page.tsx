'use client';
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { fetchOrders } from "@/lib/features/orders/ordersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const Orders = () => {
    const { orders } = useAppSelector((state) => state.orders);
    const { data: session } = useSession();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (session?.user?.email) {
            dispatch(fetchOrders({ email: session.user.email }));
        }
    }, [dispatch, session?.user.email]);
    console.log(orders);


    return (
        <>
            <Breadcrumb />
        </>
    );
};

export default Orders;