'use client'

import { useEffect } from "react";
import CatalogHeader from "../components/CatalogHeader";
import Line from "@/shared/UI/Line";
import CatalogList from "../components/CatalogList";
import Preloader from "@/shared/UI/Preloader";
import { PreloaderType } from "@/shared/UI/Preloader/PreloaderType";
import { useDispatch } from "react-redux";
import { LocalStorageKeys } from "@/core/LocalStorageKeys";
import { setCart } from "@/store/slices/cartSlice";
import { setMainPreloader, setSelectedBrand } from "@/store/slices/catalogSlice";
import { useProduct } from "@/features/hooks/useProduct";
import { useBrand } from "@/features/hooks/useBrand";
import { useQueryParams } from "@/features/hooks/useQueryParams";

const CatalogHandler: React.FC = () => {
  const dispatch = useDispatch();
  const { getProducts } = useProduct();
  const { getBrands } = useBrand();
  const { getQueryParam } = useQueryParams();

  useEffect(() => { initPage() }, []);

  async function initPage() {
    await getBrands();
    await getProducts();

    const brandInQuery: string | null = getQueryParam("BrandId");

    if(brandInQuery) {
        dispatch(setSelectedBrand(+brandInQuery));
    }
    
    const cart = localStorage.getItem(LocalStorageKeys.Cart);

    if(cart) {
        dispatch(setCart(JSON.parse(cart)));
    }

    dispatch(setMainPreloader(false));
  }

  return (
    <div className="container mx-auto">
        <CatalogHeader/>
        <Line/>
        <CatalogList/>
        <Preloader type={PreloaderType.Main}/>
    </div>
  );
};

export default CatalogHandler;

