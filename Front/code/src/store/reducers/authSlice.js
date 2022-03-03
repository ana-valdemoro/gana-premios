import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authenticationService';
import userService from '../../services/userService';
import localStorageService from '../../services/localStorageService';

const checkUserInMemory = () => {
  const user = localStorageService.getItemInMemory('user');
  return !!user;
};

const token = localStorageService.getItemInMemory('token');

const initialState = {
  isLoggedIn: null,
  user: null,
  token: token || null,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorageService.removeItemInMemory('user');
      localStorageService.removeItemInMemory('token');
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      state.error = null;
    },
    clearErrorMessage: (state) => {
      state.error = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.error = action.error.message;
      })
      .addCase(saveLopd.fulfilled, (state, action) => {
        state.user.lopd_uuid = action.payload.uuid;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
      });
  }
});

export const login = createAsyncThunk('auth/login', async (values) => {
  const { email, password } = values;
  const userCredentials = { email, password };

  const response = await authService.login(userCredentials);

  // eslint-disable-next-line no-prototype-builtins
  if (response.hasOwnProperty('token')) {
    localStorageService.saveItemInMemory('token', response.token);
    return response;
  }
  return Promise.reject(response);
});

export const saveLopd = createAsyncThunk('auth/saveLopd', async (lopd, thunkApi) => {
  const { auth } = thunkApi.getState();

  const response = await userService.saveLopd(lopd, auth.token);

  if (response.statusCode === 500 || response.statusCode === 422) {
    return Promise.reject(response);
  }

  const user = localStorageService.getItemInMemory('user');
  if (user) {
    user.lopd_uuid = response.uuid;
    localStorageService.saveItemInMemory('user', user);
  }

  return response;
});

export const updateProfile = createAsyncThunk('auth/updateProfile', async (userData, thunkApi) => {
  const { auth } = thunkApi.getState();

  const response = await userService.updateProfile(userData, auth.token);

  if (response.statusCode === 500 || response.statusCode === 422) {
    return Promise.reject(response);
  }

  if (checkUserInMemory()) {
    localStorageService.saveItemInMemory('user', response);
  }

  return response;
});

export const { logout, clearErrorMessage } = authSlice.actions;

export default authSlice.reducer;

// Selector functions

export const selectUser = (state) => state.auth.user;
