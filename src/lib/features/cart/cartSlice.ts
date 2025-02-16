import { ProductType } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartProducts = createAsyncThunk('cartProducts/fetchCartProducts', async ({ email }: { email: string }) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/cart`, { email });
    return res.data.products;
});

interface CartState {
    cartItems: ProductType,
    loading: boolean,
    error: string | null | undefined
}

const initialState: CartState = {
    cartItems: [],
    loading: false,
    error: null
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // fetch all products
            .addCase(fetchCartProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCartProducts.fulfilled, (state, action: PayloadAction<ProductType>) => {
                state.loading = false;
                state.cartItems = action.payload;
            })
            .addCase(fetchCartProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
    },
});

export default cartSlice.reducer;