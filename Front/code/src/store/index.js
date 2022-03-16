import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from './reducers/authSlice';
import messageReducer from './reducers/messageSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: ['error']
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  notification: messageReducer
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export default store;
