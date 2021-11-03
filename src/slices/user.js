import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FanFireApiService } from '../services/api/FanFireApiService';

const fanFireApiService = new FanFireApiService();

const NetworkStatusEnums = {
  LOADING: 'loading',
  SUCCESS: 'success',
  FAILED: 'failed'
};

const initialState = {
  user: {},
  firebaseUser: {},
  publicProfile: {
    username: 'JDoe',
    name: 'John Doe',
    bio: 'Just a collector of NFTs, lets see if this thing takes off',
    website: 'www.octoco.ltd',
    imageUri: null,
    profileCreated: false,
    status: NetworkStatusEnums.IDLE
  },
  publicProfileCreated: false,
  status: NetworkStatusEnums.IDLE,
  error: null
};

export const fetchUserDetails = createAsyncThunk('user/fetchUserDetails', async () => {
  try {
    const response = await fanFireApiService.fetchUserDetails();

    if (!response.isSuccess) {
      console.log('error: ', response.errorMessage);
      throw new Error(response.errorMessage);
    } else {
      console.log('success: ', response.value);
      return response.value;
    }
  } catch (err) {
    const errorMessage = err.message;
    throw new Error(errorMessage);
  }
});

export const updatePublicProfile = createAsyncThunk('user/updatePublicProfile',
  async (params) => {
    try {
      const response = await fanFireApiService.updatePublicProfile(params);

      if (!response.isSuccess) {
        console.log('error: ', response.errorMessage);
        throw new Error(response.errorMessage);
      } else {
        console.log('updatePublicProfile: ', response);
        return response.value;
      }
    } catch (err) {
      const errorMessage = err.message;
      throw new Error(errorMessage);
    }
  });

export const updateProfilePicture = createAsyncThunk('user/updateProfilePicture',
  async (params) => {
    try {
      const { base64FileContent, fileName } = params;
      const response = await fanFireApiService.updateProfilePicture(base64FileContent, fileName);

      if (!response.isSuccess) {
        console.log('error: ', response.errorMessage);
        throw new Error(response.errorMessage);
      } else {
        console.log('updateProfilePicture: ', response);
        return { ...response.value };
      }
    } catch (err) {
      const errorMessage = err.message;
      throw new Error(errorMessage);
    }
  });

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userAdded(state, action) {
      state.user = action.payload;
    },
    setFirebaseUser(state, action) {
      state.firebaseUser = action.payload;
    },
    resetUser(state) {
      console.log('RESET USER');
    },
    updatePublicProfileState(state, action) {
      const newData = action.payload;
      state.publicProfile = { ...state.publicProfile, ...newData };
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserDetails.pending, (state, action) => {
        state.status = NetworkStatusEnums.LOADING;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.status = NetworkStatusEnums.SUCCESS;
        state.user = action.payload;
        if (action.payload.publicProfile) {
          state.publicProfile = { ...action.payload.publicProfile, profileCreated: true };
          state.publicProfileCreated = true;
        } else {
          state.publicProfile = initialState.publicProfile;
          state.publicProfileCreated = false;
        }
        state.error = '';
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = NetworkStatusEnums.FAILED;
        state.error = action.error.message;
      })
      .addCase(updatePublicProfile.pending, (state, action) => {
        state.publicProfile.status = NetworkStatusEnums.LOADING;
      })
      .addCase(updatePublicProfile.fulfilled, (state, action) => {
        state.publicProfile.status = NetworkStatusEnums.SUCCESS;
        state.user = action.payload;
        state.publicProfile = action.payload.publicProfile;
        state.error = '';
        state.publicProfileCreated = true;
      })
      .addCase(updatePublicProfile.rejected, (state, action) => {
        state.publicProfile.status = NetworkStatusEnums.FAILED;
        state.error = action.error.message;
      })
      .addCase(updateProfilePicture.pending, (state, action) => {
        state.publicProfile.status = NetworkStatusEnums.LOADING;
      })
      .addCase(updateProfilePicture.fulfilled, (state, action) => {
        state.publicProfile.status = NetworkStatusEnums.SUCCESS;
        state.user = action.payload;
        state.publicProfile = { ...action.payload.publicProfile };
        state.error = '';
        state.publicProfileCreated = true;
      })
      .addCase(updateProfilePicture.rejected, (state, action) => {
        state.publicProfile.status = NetworkStatusEnums.FAILED;
        state.error = action.error.message;
      });
  }
});

export default userSlice.reducer;
export const {
  userAdded,
  resetUser,
  setFirebaseUser,
  updatePublicProfileState
} = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectUserError = (state) => state.user.error;
export const selectUserStatus = (state) => state.user.status;
export const selectFirebaseUser = (state) => state.user.firebaseUser;
export const selectPublicProfile = (state) => state.user.publicProfile;
export const selectPublicProfileCreated = (state) => state.user.publicProfileCreated;
export const selectPublicProfileStatus = (state) => state.user.publicProfile.status;
