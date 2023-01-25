import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from './ui/uiSlice';
import { authSlice } from './auth/authSlice';
import { businessSlice } from './business/businessSlice';
import { usersSlice } from './users/usersSlice';


export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        auth: authSlice.reducer,
        business: businessSlice.reducer,
        users: usersSlice.reducer,
    }
});