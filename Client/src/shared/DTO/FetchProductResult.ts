import { PriceRange } from "../types/PriceRange";
import { Product } from "../../entities/Product";

export interface FetchProductData {
    products: Product[];
    priceRange: PriceRange;
}

export interface FetchProductResult {
    data: FetchProductData;
    successed: boolean;
    status: number;
}