'use client';
import { useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '@/lib/store'
import { fetchAllProducts, fetchCategories, fetchProductCount, fetchProducts } from '@/lib/features/products/productsSlice'
import { usePathname } from 'next/navigation'
import { fetchSearchProducts } from '@/lib/features/searchProducts/searchSlice'
import { fetchCartProducts } from '@/lib/features/cart/cartSlice';
import { useSession } from 'next-auth/react';
import { fetchUsers } from '@/lib/features/users/usersSlice';
import { fetchOrders } from '@/lib/features/orders/ordersSlice';

const StoreProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    const storeRef = useRef<AppStore | null>(null);
    const location = usePathname();
    const collection = location.split('/')[2];
    const {data: session} = useSession();
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
    }

    useEffect(() => {
        if (storeRef.current) {
            storeRef.current.dispatch(fetchProducts({ currentPage: 1, itemsPerPage: collection ? 10 : 5, collection: collection ? collection : 'all', sortPriceVal: 'default' }));
            storeRef.current.dispatch(fetchProductCount({collection: collection ? collection : 'all'}));
            storeRef.current.dispatch(fetchCategories({collection: collection}));
            if(session?.user?.email){
                storeRef.current.dispatch(fetchOrders({email: session.user.email}));
                storeRef.current.dispatch(fetchCartProducts({email: session.user.email}));
            }
            storeRef.current.dispatch(fetchUsers());
            storeRef.current.dispatch(fetchAllProducts());
            storeRef.current.dispatch(fetchSearchProducts({searchText: ''}));
        }
    }, [collection, session?.user.email]);

    return <Provider store={storeRef.current}>{children}</Provider>
}

export default StoreProvider;