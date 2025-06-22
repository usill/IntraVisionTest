'use client'

import { Coin } from "@/entities/Coin";
import { usePayment } from "@/features/hooks/usePayment";
import { ButtonStyle } from "@/shared/UI/Button/ButtonDictionary";
import Circle from "@/shared/UI/Circle";
import Link from "@/shared/UI/Link";

interface Props {
    coins: Coin[]
}

const PaymentSuccessMessage: React.FC<Props> = ({ coins }) => {
    const { getTotalCoins } = usePayment();
    const total = getTotalCoins(coins);

    return (
        <section className="container mx-auto text-2xl">
            <p className="text-center mt-12">Спасибо за покупку!</p>
            <p className="text-center mt-2">Пожалуйста, возьмите вашу сдачу: <span className="font-bold text-green-600">{total} руб.</span></p>
            <p className="text-center mt-8">Ваши монеты:</p>
            <div className="flex flex-col items-center gap-4 mt-12">
                {coins.map(coin => {
                    return (
                        <div key={coin.id} className="flex items-center gap-8">
                            <Circle value={coin.value}></Circle>
                            <p>{coin.count} шт</p>
                        </div>
                    )
                })}
                <Link href="/catalog" style={ButtonStyle.Yellow} className="px-8 mt-12">Каталог напитков</Link>
            </div>
        </section>
    )
}

export default PaymentSuccessMessage;