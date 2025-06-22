"use client";

import { useCart } from "@/features/hooks/useCart";
import { Route } from "@/core/Routes";
import { ButtonStyle } from "@/shared/UI/Button/ButtonDictionary";
import Link from "@/shared/UI/Link";
import { RootState } from "@/store";
import { setTotalPrice } from "@/store/slices/cartSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CartFooter: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const router = useRouter();
  const dispatch = useDispatch();
  const { getTotalPrice } = useCart();

  useEffect(() => {
    dispatch(setTotalPrice(getTotalPrice(cartItems)));
  }, [cartItems]);

  const redirectToPayment = (event: React.MouseEvent) => {
    event.preventDefault();

    if (cartItems.length == 0) {
      return;
    }

    router.push("/payment");
  };

  return (
    <footer className="mt-auto">
      <p className="flex items-center justify-end gap-4">
        Итоговая сумма{" "}
        <span className="text-2xl font-bold">{totalPrice} руб.</span>
      </p>
      <div className="flex justify-between mt-8">
        <Link href={Route.Catalog} style={ButtonStyle.Yellow} className="px-24 text-xl">
          Вернуться
        </Link>
        <Link
          href={Route.Payment}
          style={ButtonStyle.Green}
          className="px-24 text-xl"
          onClick={redirectToPayment}
        >
          Оплата
        </Link>
      </div>
    </footer>
  );
};

export default CartFooter;
