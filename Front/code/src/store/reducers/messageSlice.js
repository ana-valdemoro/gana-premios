import { createSlice } from '@reduxjs/toolkit';

const initialState = { message: '' };

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      const response = action.payload;

      if (response.errors) {
        const errorsMessage = `${response.errors.join(', ')}`.trim();
        state.message = errorsMessage;
      } else if (response.message) {
        state.message = response.message;
      } else if (response.errors) {
        let message = '';
        response.errors.forEach((error) => {
          if (typeof error === 'object') {
            message += Object.values(error).join(', ').trim();
          }
        });
        console.log(message);
        state.message = message;
      }
    },
    clearMessage: () => ({ message: '' })
  }
});

const { reducer, actions } = messageSlice;

export const { setMessage, clearMessage } = actions;

export default reducer;
