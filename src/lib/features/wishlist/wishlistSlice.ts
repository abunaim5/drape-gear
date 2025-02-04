import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// load wishlist from local storage
const loadWishlist = (): string[] => {
    if (typeof window !== 'undefined') {
        const storedWishlist = localStorage.getItem('wishlist');
        return storedWishlist ? JSON.parse(storedWishlist) : [];
    }
    return [];
};

interface WishlistState {
    items: string[];
}

const initialState: WishlistState = {
    items: loadWishlist()
}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action: PayloadAction<string>) => {
            if (!state.items.includes(action.payload)) {
                state.items.push(action.payload);
                localStorage.setItem('wishlist', JSON.stringify(state.items));
            }
        }
    }
});

export const { addToWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;