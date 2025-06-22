import { CheckCoinsResult } from "@/shared/DTO/CheckCoinsResult";

export async function sendCoinsChange(totalPrice: number, inputCoins: number): Promise<CheckCoinsResult> {
    const url = process.env.NEXT_PUBLIC_ORDER_API;

    if(!url) {
        console.error("Путь до сервера не найден");
        return {successed: false} as CheckCoinsResult;
    }

    const change: number = inputCoins - totalPrice;

    if(change < 0) {
        return {successed: false} as CheckCoinsResult;  
    }

    const fullUrl = url + "/coin/check";

    const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(change),
    });

    return await response.json();
}