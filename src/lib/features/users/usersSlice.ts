import { UserResponseType } from "@/types/user";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// fetch all users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async() => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users`);
    return res.data.users;
});

// create types
interface UsersState {
    users: UserResponseType[],
    loading: boolean,
    error: string | null | undefined
};

// initial state for users
const initialState: UsersState = {
    users: [],
    loading: false,
    error: null
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // fetch all products
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<UserResponseType[]>) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

export default usersSlice.reducer;