import { Brand } from "./Brand";

export interface Product {
    id: number,
    title: string,
    brand: Brand,
    price: number,
    imageUrl: string,
    inStock: boolean,
}