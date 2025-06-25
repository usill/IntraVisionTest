"use client";

import { Coin } from "@/entities/Coin";
import { checkPriceText } from "@/shared/helpers/NumberHelper";
import Circle from "@/shared/UI/Circle";
import InputPlusMinus from "@/shared/UI/InputPlusMinus";
import Line from "@/shared/UI/Line";
import { RootState } from "@/store";
import { paymentAddCoin, paymentRemoveCoin, setCoinCount } from "@/store/slices/paymentSlice";
import { useDispatch, useSelector } from "react-redux";

const PaymentTable: React.FC = () => {
  const coins = useSelector((state: RootState) => state.payment.coinsList);
  const dispatch = useDispatch();

  const addCoin = (state: Coin) => {
    dispatch(paymentAddCoin(state));
  }

  const removeCoin = (state: Coin) => {
    if(state.count <= 0)
        return;

    dispatch(paymentRemoveCoin(state));
  }

  const inputCoin = (state: Coin, count: string) => {
    if(!Number.isInteger(+count)) {
      return;
    }

    dispatch(setCoinCount({
      id: state.id,
      value: state.value,
      count: +count,
    } as Coin));
  }

  const checkCoinCount = () => {}

  return (
    <div className="mt-8 flex flex-col gap-4 text-lg text-slate-800">
      <div className="grid grid-cols-8 w-full text-xl">
        <div className="col-span-4">Номинал</div>
        <div className="col-span-2 text-center">Количество</div>
        <div className="col-span-2 text-center">Сумма</div>
      </div>
      <Line/>
      <div className="flex flex-col gap-12">
      {coins?.map((coin) => {
        return (
          <div key={coin.id} className="grid grid-cols-8 w-full items-center">
            <div className="col-span-4 flex items-center gap-12">
              <Circle value={coin.value}/>
              <p>{coin.value} {checkPriceText(coin.value)}</p>
            </div>
            <div className="col-span-2 flex justify-center">
                <InputPlusMinus<Coin>
                onPlus={addCoin}
                onMinus={removeCoin}
                onInput={inputCoin}
                onCheckInput={checkCoinCount}
                value={coin.count}
                context={coin}/>
            </div>
            <div className="col-span-2 flex justify-center">
              <p className="text-2xl font-bold">{coin.value * coin.count} руб.</p>
            </div>
          </div>
        );
      })}
      </div>
      <Line/>
    </div>
  );
};

export default PaymentTable;
