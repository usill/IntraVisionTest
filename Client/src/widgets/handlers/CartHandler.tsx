'use client'

import CartFooter from "../components/CartFooter";
import CartTable from "../components/CartTable";
import { useEffect } from "react";
import { useCart } from "@/features/hooks/useCart";

const CartHandler: React.FC = () => {
  const {initCart} = useCart();

  useEffect(() => {
    initCart();
  }, []);

  return (
    <div className="container mx-auto">
        <section className="flex flex-col">
          <h1 className="font-bold text-3xl text-slate-700">
            Оформление заказа
          </h1>
          <CartTable></CartTable>
          <CartFooter></CartFooter>
        </section>
    </div>
  )
}

export default CartHandler;