import { CartProductListType, CartProductResponseType } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartProducts = createAsyncThunk('cart/fetchCartProducts', async ({ email }: { email: string }) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/cart`, { email });
    return res.data;
});

export const addToCart = createAsyncThunk('addCart/addToCart', async (cartProduct: CartProductListType) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/addCart`, { cartProduct });
    return res.data;
});

export const removeFromCart = createAsyncThunk('removeCart/removeFromCart', async ({ id, email }: { id: string, email: string }) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/removeCart`, { id, email });
    return res.data;
});

export const updateCartQuantity = createAsyncThunk('updateQuantity/updateCartQuantity', async ({ id, email, productQuantity }: { id: string, email: string, productQuantity: number }) => {
    const res = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/cartQuantity/${id}`, { email, productQuantity });
    return res.data;
});

interface CartState {
    cart: CartProductResponseType,
    loading: boolean,
    error: string | null | undefined
}

const initialState: CartState = {
    cart: {
        success: false,
        products: []
    },
    loading: false,
    error: null
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            // fetch cart products
            .addCase(fetchCartProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCartProducts.fulfilled, (state, action: PayloadAction<CartProductResponseType>) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(fetchCartProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            // add to cart products
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action: PayloadAction<CartProductResponseType>) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            // update cart product quantity
            .addCase(updateCartQuantity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartQuantity.fulfilled, (state, action: PayloadAction<CartProductResponseType>) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(updateCartQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            // remove products from cart
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action: PayloadAction<CartProductResponseType>) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
    },
});

export default cartSlice.reducer;