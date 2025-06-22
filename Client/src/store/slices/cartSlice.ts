import { CartItem } from "@/shared/DTO/CartItem";
import { LocalStorageKeys } from "@/core/LocalStorageKeys";
import { Product } from "@/entities/Product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartSlice {
  items: CartItem[];
  totalPrice: number;
}

const initialState: CartSlice = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
    cartAddProduct(state, action: PayloadAction<Product>) {
      const productInList: Product = action.payload;
      const productInCart: CartItem | undefined = state.items.find(
        (item: CartItem) => item.product.id == productInList.id
      );

      if (productInCart) {
        productInCart.count++;
      } else if (productInList) {
        state.items.push({
          product: productInList,
          count: 1,
        } as CartItem);
      }

      localStorage.setItem(LocalStorageKeys.Cart, JSON.stringify(state.items));
    },
    cartRemoveProduct(state, action: PayloadAction<Product>) {
      const productInList: Product = action.payload;
      const productInCart: CartItem | undefined = state.items.find(
        (item: CartItem) => item.product.id == productInList.id
      );

      if (productInCart) {
        productInCart.count--;
      }
      if (productInCart && productInCart.count <= 0) {
        state.items = state.items.filter(
          (item) => item.product.id !== productInList.id
        );
      }

      localStorage.setItem(LocalStorageKeys.Cart, JSON.stringify(state.items));
    },
    cartRemoveProductFull(state, action: PayloadAction<Product>) {
      const productInList: Product = action.payload;
      state.items = state.items.filter(
        (item) => item.product.id !== productInList.id
      );
      localStorage.setItem(LocalStorageKeys.Cart, JSON.stringify(state.items));
    },
    setCartItemCount(state, action: PayloadAction<CartItem>) {
      const cartItem: CartItem = action.payload;
      const productInCart: CartItem | undefined = state.items.find(
        (item) => item.product.id == cartItem.product.id
      );

      if (productInCart) {
        productInCart.count = cartItem.count;
      }

      localStorage.setItem(LocalStorageKeys.Cart, JSON.stringify(state.items));
    },
    setTotalPrice(state, action: PayloadAction<number>) {
      state.totalPrice = action.payload;
    }
  },
});

export const {
  setCart,
  cartAddProduct,
  cartRemoveProduct,
  cartRemoveProductFull,
  setCartItemCount,
  setTotalPrice,
} = cartSlice.actions;
export default cartSlice.reducer;
