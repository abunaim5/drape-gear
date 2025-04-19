import { OrderedProductsInfoResponseType } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// fetch all orders
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async ({ email }: { email: string }) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/orders`, { email });
    return res.data.orders;
});

// create types
interface OrdersState {
    orders: OrderedProductsInfoResponseType[],
    loading: boolean,
    error: string | null | undefined
};

// initial state for orders
const initialState: OrdersState = {
    orders: [],
    loading: false,
    error: null
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // fetch all products
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<OrderedProductsInfoResponseType[]>) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

export default ordersSlice.reducer;