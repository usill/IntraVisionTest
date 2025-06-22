"use client";

import { useDispatch } from "react-redux";
import { fetchBrands } from "../API/fetchBrands";
import { Brand } from "@/entities/Brand";
import { setBrands } from "@/store/slices/catalogSlice";

export function useBrand() {
  const dispatch = useDispatch();

  async function getBrands() {
    const brands: Brand[] = await fetchBrands();
    dispatch(setBrands(brands));
  }

  return {
    getBrands
  };
}
