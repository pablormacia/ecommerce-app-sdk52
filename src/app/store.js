import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userSlice'
import { shopApi } from '../services/shopService'
import { authApi } from '../services/authService'
import { userApi } from '../services/userService'


export const store = configureStore({
  reducer: {
    authReducer,
    userReducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApi.middleware).concat(userApi.middleware).concat(authApi.middleware),
})


