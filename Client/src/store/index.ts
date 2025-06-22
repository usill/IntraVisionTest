import { configureStore } from "@reduxjs/toolkit";
import catalogReducer from './slices/catalogSlice'
import cartSlice from './slices/cartSlice'
import paymentSlice from './slices/paymentSlice'

export const store = configureStore({
    reducer: {
        catalog: catalogReducer,
        cart: cartSlice,
        payment: paymentSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch