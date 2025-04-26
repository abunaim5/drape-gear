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
import { Session } from 'next-auth';

const loadStoreData = (store: AppStore, collection: string, session: Session | null) => {
    store.dispatch(fetchProducts({ currentPage: 1, itemsPerPage: collection ? 10 : 5, collection: collection ? collection : 'all', sortPriceVal: 'default' }));
    store.dispatch(fetchProductCount({ collection: collection ? collection : 'all' }));
    store.dispatch(fetchCategories({ collection: collection }));
    store.dispatch(fetchSearchProducts({ searchText: '' }));

    if (session?.user?.email) {
        if (session?.user?.role === 'user') {
            store.dispatch(fetchOrders({ email: session.user.email }));
            store.dispatch(fetchCartProducts({ email: session.user.email }));
        }

        if (session?.user?.role === 'admin') {
            store.dispatch(fetchOrders({ email: session.user.email }));
            store.dispatch(fetchUsers());
            store.dispatch(fetchAllProducts());
        }
    }
}

const StoreProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    const storeRef = useRef<AppStore | null>(null);
    const location = usePathname();
    const collection = location.split('/')[2];
    const { data: session, status } = useSession();
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
    }

    useEffect(() => {
        if (!storeRef.current) return;
        if (status === 'loading') return;
        loadStoreData(storeRef.current, collection, session)
    }, [collection, session, status]);

    return <Provider store={storeRef.current}>{children}</Provider>
}

export default StoreProvider;