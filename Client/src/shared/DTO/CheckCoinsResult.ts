import { Coin } from "@/entities/Coin"

export interface CheckCoinsResult {
    coins: Coin[]
    successed: boolean
    textResult: string
}