import { OrderProduct } from "./OrderProduct";

export interface Order {
    id: number,
    createdAt: Date,
    totalCount: number,
    products: OrderProduct[],
}