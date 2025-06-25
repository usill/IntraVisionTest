"use client";

import { useEffect } from "react";
import PaymentTable from "../components/PaymentTable";
import { fetchCoins } from "@/features/API/fetchCoins";
import { Coin } from "@/entities/Coin";
import { useDispatch } from "react-redux";
import { setCoins } from "@/store/slices/paymentSlice";
import PaymentFooter from "../components/PaymentFooter";
import { useCart } from "@/features/hooks/useCart";

const PaymentHandler: React.FC = () => {
  const dispatch = useDispatch();
  const {initCart} = useCart();

  useEffect(() => {
    initPage();
    initCart();
  }, []);

  const initPage = async () => {
    const coins: Coin[] = await fetchCoins();
    coins?.map(c => c.count = 0);
    dispatch(setCoins(coins));
  }

  return (
    <div className="container mx-auto">
      <section className="flex flex-col">
        <h1 className="font-bold text-3xl text-slate-700">Оплата</h1>
        <PaymentTable/>
        <PaymentFooter/>
      </section>
    </div>
  );
};

export default PaymentHandler;
