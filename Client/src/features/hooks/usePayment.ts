'use client'

import { Coin } from "@/entities/Coin"

export function usePayment() {

    function getTotalCoins(coins: Coin[]): number {
        return coins.reduce((prev, current) => prev + current.value * current.count, 0);
    }

    return {
        getTotalCoins,
    }
}