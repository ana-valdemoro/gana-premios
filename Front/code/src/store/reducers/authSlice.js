import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authenticationService';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  isLoggedIn: !!user,
  user: user ? { ...user } : null,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('user');
      state.isLoggedIn = false;
      state.user = null;
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
      .addCase(saveLopd.rejected, (state, action) => action.error);
  }
});

export const login = createAsyncThunk('auth/login', async (values) => {
  const { remember, email, password } = values;
  const userCredentials = { email, password };

  const response = await authService.login(userCredentials);

  // eslint-disable-next-line no-prototype-builtins
  if (response.hasOwnProperty('token')) {
    if (remember) {
      localStorage.setItem('user', JSON.stringify(response));
    }
    return response;
  }
  return Promise.reject(response);
});

export const saveLopd = createAsyncThunk('auth/saveLopd', async (lopd, thunkApi) => {
  const { auth } = thunkApi.getState();

  const response = await authService.saveLopd(lopd, auth.user.token);
  console.log(response);

  if (response.statusCode === 500 || response.statusCode === 422) {
    console.log('Algo ha ido mal');
    return Promise.reject(response);
  }

  return response;
});

export const { logout, clearErrorMessage } = authSlice.actions;

export default authSlice.reducer;

// Selector functions

export const selectUser = (state) => state.auth.user;
