import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authenticationService';
import userService from '../../services/userService';

const getUserInMemory = () => JSON.parse(localStorage.getItem('user'));

const saveUserInMemory = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const checkUserInMemory = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return !!user;
};

const user = JSON.parse(localStorage.getItem('user'));
const token = JSON.parse(localStorage.getItem('token'));

const initialState = {
  isLoggedIn: !!user,
  user: user ? { ...user } : null,
  token: token || null,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
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
  const { remember, email, password } = values;
  const userCredentials = { email, password };

  const response = await authService.login(userCredentials);

  // eslint-disable-next-line no-prototype-builtins
  if (response.hasOwnProperty('token')) {
    if (remember) {
      localStorage.setItem('token', JSON.stringify(response.token));
      localStorage.setItem('user', JSON.stringify(response));
    }
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

  const user = getUserInMemory();
  if (user) {
    user.lopd_uuid = response.uuid;
    saveUserInMemory(user);
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
    saveUserInMemory(response);
  }

  return response;
});

export const { logout, clearErrorMessage } = authSlice.actions;

export default authSlice.reducer;

// Selector functions

export const selectUser = (state) => state.auth.user;
