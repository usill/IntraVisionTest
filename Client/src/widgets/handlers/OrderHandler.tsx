'use client'

import { CheckCoinsResult } from "@/shared/DTO/CheckCoinsResult"
import { LocalStorageKeys } from "@/core/LocalStorageKeys"
import PaymentSuccessMessage from "../components/OrderSuccessMessage"
import PaymentErrorMessage from "../components/OrderErrorMessage"
import { useEffect, useState } from "react"

const OrderHandler: React.FC = () => {
    const [changeResult, setChangeResult] = useState<CheckCoinsResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const raw = localStorage.getItem(LocalStorageKeys.CoinsChange);

        if (!raw) {
            setError("Сдача не найдена");
            return;
        }

        try {
            const parsed: CheckCoinsResult = JSON.parse(raw);

            if (parsed.successed) {
                localStorage.removeItem(LocalStorageKeys.Cart);
                setChangeResult(parsed);
            } else {
                setError("Извините, в данный момент мы не можем продать вам товар по причине того, что автомат не может выдать вам нужную сдачу");
            }
        } catch {
            setError("Неверный формат сдачи");
        }
    }, []);

    if (error) {
        return <PaymentErrorMessage message={error} />;
    }

    if (!changeResult) {
        return null;
    }

    return <PaymentSuccessMessage coins={changeResult.coins} />;
};

export default OrderHandler;