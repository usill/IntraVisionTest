"use client";

import { useCart } from "@/features/hooks/useCart";
import { usePayment } from "@/features/hooks/usePayment";
import { ButtonStyle } from "@/shared/UI/Button/ButtonDictionary";
import { RootState } from "@/store";
import Link from "@/shared/UI/Link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route } from "@/core/Routes";
import Button from "@/shared/UI/Button";
import { CheckCoinsResult } from "@/shared/DTO/CheckCoinsResult";
import { sendCoinsChange } from "@/features/API/sendCoinsChange";
import { LocalStorageKeys } from "@/core/LocalStorageKeys";
import { useRouter } from "next/navigation";

const PaymentFooter: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const coins = useSelector((state: RootState) => state.payment.coinsList);
  const { getTotalPrice } = useCart();
  const { getTotalCoins } = usePayment();
  const [ priceColor, setPriceColor ] = useState<string>("text-red-600");
  const router = useRouter();

  useEffect(() => {
    if(getTotalCoins(coins) < getTotalPrice(cartItems)) {
        setPriceColor("text-red-600");
    } else {
        setPriceColor("text-green-600");
    }
  }, [coins]);

  const redirectToOrder = async (event: React.MouseEvent) => {
    event.preventDefault();

    if(getTotalCoins(coins) < getTotalPrice(cartItems)) {
        return;
    }

    const coinsChange: CheckCoinsResult = await sendCoinsChange(getTotalPrice(cartItems), getTotalCoins(coins));

    localStorage.setItem(LocalStorageKeys.CoinsChange, JSON.stringify(coinsChange));

    router.push(Route.Order);
  }

  return (
    <footer className="mt-auto">
      <div className="flex justify-end gap-8">
        <p className="flex items-center justify-end gap-4">
          Итоговая сумма
          <span className="text-2xl font-bold">
            {getTotalPrice(cartItems)} руб.
          </span>
        </p>
        <p className="flex items-center justify-end gap-4">
          Вы внесли
          <span className={`text-2xl font-bold ${priceColor}`}>{getTotalCoins(coins)} руб.</span>
        </p>
      </div>
      <div className="flex justify-between mt-8">
        <Link href={Route.Cart} style={ButtonStyle.Yellow} className="px-24 text-xl">
            Вернуться
        </Link>
        <Button onClick={redirectToOrder} style={ButtonStyle.Green} className="px-24 text-xl">
          Оплатить
        </Button>
      </div>
    </footer>
  );
};

export default PaymentFooter;
