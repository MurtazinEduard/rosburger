import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { cartReducer } from "./slices/cart";
import { ICartSlice, IUserSlice } from "./types";

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
    }
})

export default store

export type IState = {
    auth: IUserSlice;
    cart: ICartSlice;
};

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>