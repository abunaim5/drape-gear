import { userResponseType, UserType } from "@/types/user";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// fetch wishlist products from backend
export const fetchUser = createAsyncThunk('user/fetchUser', async (userInfo: UserType) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, { userInfo: userInfo });
    return res.data.user;
});

interface UsersState {
    users: userResponseType,
    loading: boolean,
    error: string | null | undefined
}

const initialState: UsersState = {
    users: [],
    loading: false,
    error: null
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // fetch single user
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action: PayloadAction<userResponseType>) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
    }
});

export default usersSlice.reducer;