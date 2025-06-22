'use client'

import { CartItem } from "@/shared/DTO/CartItem";
import { LocalStorageKeys } from "@/core/LocalStorageKeys";
import { setCart } from "@/store/slices/cartSlice";
import { useDispatch } from "react-redux";


export function useCart() {
    const dispatch = useDispatch();

    const getTotalPrice = (cartItems: CartItem[]) : number => {
        let price: number = 0;

        for(const cartItem of cartItems) {
            price += cartItem.count * cartItem.product.price;
        }

        return price;
    }

    const initCart = () => {
        const cart = localStorage.getItem(LocalStorageKeys.Cart);
    
        if (cart) {
          dispatch(setCart(JSON.parse(cart)));
        }
      };

    return {
        getTotalPrice,
        initCart,
    }
}