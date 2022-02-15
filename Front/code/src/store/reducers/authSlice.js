import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem('user'));

const authSlice = createSlice({
  name: 'user',
  initialState: user ? { value: user } : { value: null },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = false;
    }
  }
});

// export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
//   const response = await client.get('/fakeApi/users');
//   return response.data;
// });

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

// Selector functions

export const selectUser = (state) => state.user;
