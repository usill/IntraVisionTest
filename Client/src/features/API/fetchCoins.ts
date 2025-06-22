import { Coin } from "@/entities/Coin";

export async function fetchCoins(): Promise<Coin[]> {
    const url = process.env.NEXT_PUBLIC_ORDER_API;

    if(!url) {
        console.error("Путь до сервера не найден");
        return [];
    }

    const fullUrl = url + "/coin/all";
    const response = await fetch(fullUrl, { method: "GET" });

    if(response.ok) {
       return await response.json(); 
    }
    
    if(response.status == 500) {
        console.error("Ошибка сервера");
    }

    return [];
}