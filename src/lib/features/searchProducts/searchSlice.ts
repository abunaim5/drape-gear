import { productType } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSearchProducts = createAsyncThunk('searchProducts/fetchSearchProducts', async ({ searchText }: { searchText: string }) => {
    if (searchText === '') {
        return [];
    } else {
        const res = await axios.get(`http://localhost:5000/searchProducts?search=${searchText}`);
        return res.data.searchResult;
    }
});

// create types
interface searchState {
    searchProducts: productType,
    loading: boolean,
    error: string | null | undefined
};

// initial state for search products
const initialState: searchState = {
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
            .addCase(fetchSearchProducts.fulfilled, (state, action: PayloadAction<productType>) => {
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