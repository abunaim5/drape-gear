import { productType } from "@/types/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({ itemsPerPage, collection, sortPriceVal }: { itemsPerPage: number, collection: string, sortPriceVal: string }) => {
    const res = await axios.get(`http://localhost:5000/products?size=${itemsPerPage}&filter=${collection}&sort=${sortPriceVal}`);
    return res.data.products;
});

export const fetchProductCount = createAsyncThunk('count/fetchProductCount', async () => {
    const res = await axios.get('http://localhost:5000/productCount');
    return res.data.count;
});

// create types
interface ProductsState {
    products: productType,
    productCount: number;
    loading: boolean,
    error: string | null | undefined
};

// initial state for products
const initialState: ProductsState = {
    products: [],
    productCount: 0,
    loading: false,
    error: null
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // fetch all products
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<productType>) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
            // fetch product count
            .addCase(fetchProductCount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductCount.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.productCount = action.payload;
            })
            .addCase(fetchProductCount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
    },
});

export default productsSlice.reducer;