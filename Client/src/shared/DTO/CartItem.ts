import { Product } from "../../entities/Product";

export interface CartItem {
    product: Product;
    count: number;
}