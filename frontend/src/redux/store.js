import {configureStore} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import {apiSlice} from "./api/apiSlice";
import authReducer from './feature/auth/authSlice';

const store = configureStore({
    reducer: {
        [apiSlice.reducePath]: apiSlice.reducer,
         auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

setupListeners(store.dispatch);
export default store;  