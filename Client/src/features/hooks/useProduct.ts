"use client";

import { setProducts, setProductsPreloader } from "@/store/slices/catalogSlice";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../API/fetchProducts";
import { FetchProductResult } from "@/shared/DTO/FetchProductResult";

export function useProduct() {
  const dispatch = useDispatch();

  async function getProducts() {
    dispatch(setProductsPreloader(true));
    const result: FetchProductResult = await fetchProducts();

    if (result.successed) {
      dispatch(setProducts(result.data));
    }
    dispatch(setProductsPreloader(false));
  }

  return {
    getProducts,
  };
}
