import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FanFireApiService } from '../services/api/FanFireApiService';

const fanFireApiService = new FanFireApiService();

const initialState = {
  loadedNFTs: [],
  status: 'idle',
  error: null
};

export const fetchAllNFTs = createAsyncThunk('nft/fetchAllNFTs', async () => {
  try {
    const response = await fanFireApiService.fetchAllNFTs();

    if (!response.isSuccess) {
      console.log('error: ', response.errorMessage);
      throw new Error(response.errorMessage);
    } else {
      return response.value;
    }
  } catch (err) {
    const errorMessage = err.message;
    throw new Error(errorMessage);
  }
});

const exploreNFTsSlice = createSlice({
  name: 'nft',
  initialState,
  reducers: {
    setLoadedNFTs(state, action) {
      state.loadedNFTs = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllNFTs.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAllNFTs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loadedNFTs = action.payload;
      })
      .addCase(fetchAllNFTs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default exploreNFTsSlice.reducer;
export const {
  setLoadedNFTs,
} = exploreNFTsSlice.actions;

export const selectLoadedNFTs = (state) => state.marketplace.loadedNFTs;
export const selectMarketPlaceNftsNetworkStatus = (state) => state.marketplace.status;
