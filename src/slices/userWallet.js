import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FanFireApiService } from '../services/api/FanFireApiService';

const fanFireApiService = new FanFireApiService();

const initialState = {
  userWallet: {},
  status: 'idle',
  error: null
};

export const fetchUserWallet = createAsyncThunk('userWallet/fetchUserWallet', async () => {
  try {
    const response = await fanFireApiService.fetchUserWallet();
    if (!response.isSuccess) {
      throw new Error(response.errorMessage);
    } else {
      return response.value;
    }
  } catch (err) {
    const errorMessage = err.message;
    throw new Error(errorMessage);
  }
});

const userWalletSlice = createSlice({
  name: 'userWallet',
  initialState,
  reducers: {
    setUserWallet(state, action) {
      state.userWallet = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserWallet.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchUserWallet.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userWallet = action.payload;
      })
      .addCase(fetchUserWallet.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default userWalletSlice.reducer;
export const {
  setUserWallet,
} = userWalletSlice.actions;

export const selectUserWallet = (state) => state.userWallet.userWallet;
export const selectUserWalletError = (state) => state.userWallet.error;
export const selectUserWalletStatus = (state) => state.userWallet.status;
