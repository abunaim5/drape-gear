import { ProductType } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSearchProducts = createAsyncThunk('searchProducts/fetchSearchProducts', async ({ searchText }: { searchText: string }) => {
    if (searchText === '') {
        return [];
    } else {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/searchProducts?search=${searchText}`);
        return res.data.searchResult;
    }
});

// create types
interface SearchState {
    searchProducts: ProductType,
    loading: boolean,
    error: string | null | undefined
};

// initial state for search products
const initialState: SearchState = {
    searchProducts: [],
    loading: false,
    error: null
};

const searchSlice = createSlice({
    name: 'searchProducts',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // fetch search products
            .addCase(fetchSearchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSearchProducts.fulfilled, (state, action: PayloadAction<ProductType>) => {
                state.loading = false;
                state.searchProducts = action.payload;
            })
            .addCase(fetchSearchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
    }
});

export default searchSlice.reducer;