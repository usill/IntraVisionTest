'use client'

import { Coin } from "@/entities/Coin"

export function usePayment() {

    function getTotalCoins(coins: Coin[]): number {
        let price = 0;

        for(const coin of coins) {
            price += coin.value * coin.count;
        }

        return price;
    }

    return {
        getTotalCoins,
    }
}