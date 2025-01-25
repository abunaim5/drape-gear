'use client'
import { useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '@/lib/store'
import { fetchProductCount, fetchProducts } from '@/lib/features/products/productsSlice'

const StoreProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    const storeRef = useRef<AppStore | null>(null)
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
    }

    useEffect(() => {
        if(storeRef.current) {
            storeRef.current.dispatch(fetchProducts({itemsPerPage: 10, collection: 'all', sortPriceVal: 'default'}));
            storeRef.current.dispatch(fetchProductCount());
        }
    }, []);

    return <Provider store={storeRef.current}>{children}</Provider>
}

export default StoreProvider;