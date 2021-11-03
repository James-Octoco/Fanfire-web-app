import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FanFireApiService } from '../services/api/FanFireApiService';

const fanFireApiService = new FanFireApiService();

const NetworkStatusEnums = {
  LOADING: 'loading',
  SUCCESS: 'success',
  FAILED: 'failed'
};

const initialState = {
  userNFTs: {},
  status: NetworkStatusEnums.LOADING,
  error: null
};

export const fetchUserNFTs = createAsyncThunk('userNFTs/fetchUserNFTs', async () => {
  try {
    const response = await fanFireApiService.fetchUserNFTs();
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

const userNFTsSlice = createSlice({
  name: 'userNFTs',
  initialState,
  reducers: {
    setUserNFTs(state, action) {
      state.userNFTs = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserNFTs.pending, (state, action) => {
        state.status = NetworkStatusEnums.LOADING;
      })
      .addCase(fetchUserNFTs.fulfilled, (state, action) => {
        state.status = NetworkStatusEnums.SUCCESS;
        state.error = '';
        state.userNFTs = action.payload;
      })
      .addCase(fetchUserNFTs.rejected, (state, action) => {
        state.status = NetworkStatusEnums.FAILED;
        state.error = action.error.message;
      });
  }
});

export default userNFTsSlice.reducer;
export const {
  setUserNFTs,
} = userNFTsSlice.actions;

export const selectUserNFTs = (state) => state.userNFTs.userNFTs;
export const selectUserNFTsError = (state) => state.userNFTs.error;
export const selectUserNFTsStatus = (state) => state.userNFTs.status;
