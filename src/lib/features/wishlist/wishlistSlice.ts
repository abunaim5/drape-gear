import { ProductType } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// load wishlist from local storage
const loadWishlist = (): string[] => {
    if (typeof window !== 'undefined') {
        const storedWishlistIds = localStorage.getItem('wishlist');
        return storedWishlistIds ? JSON.parse(storedWishlistIds) : [];
    }
    return [];
};

// fetch wishlist products from backend
export const fetchWishlist = createAsyncThunk('wishlist/fetchWishlist', async (wishlistItems: string[]) => {
    const res = await axios.post('http://localhost:5000/wishlist', { wishlist: wishlistItems });
    return res.data.products;
});

interface WishlistState {
    itemIds: string[],
    wishlistItems: ProductType,
    loading: boolean,
    error: string | null | undefined
}

const initialState: WishlistState = {
    itemIds: loadWishlist(),
    wishlistItems: [],
    loading: false,
    error: null
}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action: PayloadAction<string>) => {
            if (!state.itemIds.includes(action.payload)) {
                state.itemIds.push(action.payload);
                localStorage.setItem('wishlist', JSON.stringify(state.itemIds));
            }
        },
        removeFromWishlist: (state, action: PayloadAction<string>) => {
            state.itemIds = state.itemIds.filter(id => id !== action.payload);
            localStorage.setItem('wishlist', JSON.stringify(state.itemIds));
        }
    },
    extraReducers(builder) {
        builder
            // fetch all products
            .addCase(fetchWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWishlist.fulfilled, (state, action: PayloadAction<ProductType>) => {
                state.loading = false;
                state.wishlistItems = action.payload;
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
    }
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;