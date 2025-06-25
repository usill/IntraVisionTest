"use client";

import { CartItem } from "@/shared/DTO/CartItem";
import { Product } from "@/entities/Product";
import Line from "@/shared/UI/Line";
import { RootState } from "@/store";
import {
  cartAddProduct,
  cartRemoveProduct,
  cartRemoveProductFull,
  setCartItemCount,
} from "@/store/slices/cartSlice";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputPlusMinus from "@/shared/UI/InputPlusMinus";

const CartTable: React.FC = () => {
  const emptyText = "У вас нет ни одного товара, вернитесь на страницу каталога";
  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  );
  const dispatch = useDispatch();
  const [emptyMessage, setEmptyMessage] = useState<string>(emptyText);

  useEffect(() => {
    if (cartItems.length > 0) {
      setEmptyMessage("");
    } else {
      setEmptyMessage(emptyText);
    }
  }, [cartItems]);

  const addProduct = (state: CartItem) => {
    dispatch(cartAddProduct(state.product));
  };

  const removeProduct = (state: CartItem) => {
    dispatch(cartRemoveProduct(state.product));
  };

  const fullRemoveProduct = (product: Product) => {
    dispatch(cartRemoveProductFull(product));
  };

  const setProductCount = (state: CartItem, count: string) => {
    if (!Number.isInteger(+count)) {
      return;
    }

    dispatch(
      setCartItemCount({
        product: state.product,
        count: +count,
      } as CartItem)
    );
  };

  const checkProductCount = (cartItem: CartItem) => {
    if (cartItem.count <= 0) {
      dispatch(cartRemoveProductFull(cartItem.product));
    }
  };

  return (
    <div className="mt-8 flex flex-col gap-4 text-lg text-slate-800">
      <div className="grid grid-cols-9 w-full text-xl">
        <div className="col-span-4">Товар</div>
        <div className="col-span-2 text-center">Количество</div>
        <div className="col-span-2 text-center">Цена</div>
        <div className="col-span-1"/>
      </div>
      <Line/>
      <div className="flex flex-col gap-12">
        {cartItems?.map((cartItem) => {
          return (
            <div
              className="grid grid-cols-9 w-full items-center"
              key={cartItem.product.id}
            >
              <div className="col-span-4 flex items-center gap-4">
                <img
                  src={cartItem.product.imageUrl}
                  alt={cartItem.product.title}
                  className="h-[110px]"
                />
                <p>{cartItem.product.title}</p>
              </div>
              <div className="col-span-2 flex justify-center">
                <InputPlusMinus<CartItem>
                  onPlus={addProduct}
                  onMinus={removeProduct}
                  onInput={setProductCount}
                  onCheckInput={checkProductCount}
                  context={cartItem}
                  value={cartItem.count}
                />
              </div>
              <div className="col-span-2 flex justify-center">
                <p className="text-2xl font-bold">
                  {cartItem.product.price * cartItem.count} руб.
                </p>
              </div>
              <div className="col-span-1 flex justify-end">
                <button
                  className="cursor-pointer"
                  onClick={() => fullRemoveProduct(cartItem.product)}
                >
                  <Trash2 size={28}/>
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {emptyMessage}
      <Line/>
    </div>
  );
};

export default CartTable;
