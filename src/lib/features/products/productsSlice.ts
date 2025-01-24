import { productType } from "@/types/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({ collection, sortPriceVal }: { collection: string, sortPriceVal: string }) => {
    const res = await axios.get(`http://localhost:5000/products?filter=${collection}&sort=${sortPriceVal ? sortPriceVal : 'default'}`);
    return res.data.products;
});

// create types
interface ProductsState {
    products: productType,
    loading: boolean,
    error: string | null | undefined
};

// initial state for products
const initialState: ProductsState = {
    products: [],
    loading: false,
    error: null
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
    },
});

export default productsSlice.reducer;