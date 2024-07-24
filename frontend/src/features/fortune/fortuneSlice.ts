import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface FortuneState {
    message: string;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: FortuneState = {
    message: '',
    status: 'idle',
    error: null,
};

export const fetchFortune = createAsyncThunk('fortune/fetchFortune', async () => {
    const response = await axios.get('http://localhost:8080/');
    return response.data;
});

const fortuneSlice = createSlice({
    name: 'fortune',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFortune.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFortune.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.message = action.payload;
            })
            .addCase(fetchFortune.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export default fortuneSlice.reducer;