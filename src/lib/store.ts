import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/products/productsSlice';
import usersReducer from './features/users/usersSlice';
import ordersReducer from './features/orders/ordersSlice';
import cartReducer from './features/cart/cartSlice';
import wishlistReducer from './features/wishlist/wishlistSlice';
import searchReducer from './features/searchProducts/searchSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            cart: cartReducer,
            users: usersReducer,
            orders: ordersReducer,
            products: productReducer,
            wishlist: wishlistReducer,
            searchProducts: searchReducer
        }
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']