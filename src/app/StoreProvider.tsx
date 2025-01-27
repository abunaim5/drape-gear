'use client'
import { useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '@/lib/store'
import { fetchProductCount, fetchProducts } from '@/lib/features/products/productsSlice'
import { usePathname } from 'next/navigation'

const StoreProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    const storeRef = useRef<AppStore | null>(null);
    const location = usePathname();
    const collection = location.split('/')[2];
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
    }

    useEffect(() => {
        if (storeRef.current) {
            storeRef.current.dispatch(fetchProducts({ currentPage: 1, itemsPerPage: 10, collection: collection, sortPriceVal: 'default' }));
            storeRef.current.dispatch(fetchProductCount({collection: collection}));
        }
    }, [collection]);

    return <Provider store={storeRef.current}>{children}</Provider>
}

export default StoreProvider;