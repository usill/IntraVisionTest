"use client";

import { Brand } from "@/entities/Brand";
import { ButtonStyle } from "@/shared/UI/Button/ButtonDictionary";
import { RootState } from "@/store";
import { setSelectedBrand, setSelectedMinPrice } from "@/store/slices/catalogSlice";
import { ChangeEvent, useEffect, useState } from "react";
import { Range } from "react-range";
import { useDispatch, useSelector } from "react-redux";
import { sendExcel } from "@/features/API/sendExcel";
import { PriceRange } from "@/shared/types/PriceRange";
import { useQueryParams } from "@/features/hooks/useQueryParams";
import { CartItem } from "@/shared/DTO/CartItem";
import { useProduct } from "@/features/hooks/useProduct";
import { useRouter } from "next/navigation";
import Link from "@/shared/UI/Link";
import { Route } from "@/core/Routes";

const CatalogHeader: React.FC = () => {
  const brands: Brand[] = useSelector((state: RootState) => state.catalog.brands);
  const filters = useSelector((state: RootState) => state.catalog.selectedFilters);
  const priceRange: PriceRange = useSelector((state: RootState) => state.catalog.productData.priceRange); 
  const [rangeEventMinPrice, setRangeEventMinPrice] = useState<number[]>([filters.minPrice]);
  const { getQueryParam, setQueryParam } = useQueryParams();
  const cartItems: CartItem[] = useSelector((state: RootState) => state.cart.items);
  const [cartItemsCount, setCartItemsCount] = useState<number>(0);
  const { getProducts } = useProduct();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(setSelectedMinPrice(rangeEventMinPrice[0]));
  }, [rangeEventMinPrice]);

  useEffect(() => {
    let count = 0;

    for(const item of cartItems) {
        count += item.count;
    }

    setCartItemsCount(count);
  }, [cartItems]);
  
  useEffect(() => {
    const priceCenter: number = (priceRange.maxPrice + priceRange.minPrice) / 2;
    const queryMinPrice: string | null = getQueryParam("MinPrice");

    if(queryMinPrice) {
        if(+queryMinPrice > priceRange.maxPrice) {
            setRangeEventMinPrice([priceRange.maxPrice]);
            return;
        }
        if(+queryMinPrice < priceRange.minPrice) {
            setRangeEventMinPrice([priceRange.minPrice]);
            return;
        }

        setRangeEventMinPrice([+queryMinPrice]);
        return;
    }

    if(!Number.isNaN(priceCenter)) {
        setRangeEventMinPrice([priceCenter]);
    }
  }, [priceRange]);

  async function changeFilterBrand(event: ChangeEvent<HTMLSelectElement>) {
    const brandId: number = +event.target.value;
    dispatch(setSelectedBrand(brandId));
    setQueryParam("BrandId", brandId.toString(), true);
    getProducts();
  }

  async function changeFilterMinPrice(filter: number[]) {
    const minPrice:number = filter[0];
    setQueryParam("MinPrice", minPrice.toString());
    getProducts();
  }

  async function redirectToCart(event: React.MouseEvent) {
    event.preventDefault();

    if(cartItemsCount == 0)
        return;

    router.push("/cart");
  }

  return (
    <header className="grid grid-cols-3 gap-32">
      <div className="col-span-2">
        <h1 className="font-bold text-3xl text-slate-700">
          Газированные напитки
        </h1>
        <div className="flex mt-12 gap-24">
          <div className="w-1/2 flex flex-col">
            <label htmlFor="brand-filter" className="text-sm">
              Выберите бренд
            </label>
            <select
              name="brand"
              id="brand-filter"
              className="border border-gray-400 mt-3 px-3 py-2 text-sm"
              value={filters.brandId}
              onChange={changeFilterBrand}
            >
              <option value="" defaultChecked>
                Все бренды
              </option>
              {brands?.map((brand) => {
                return (
                  <option value={brand.id} key={brand.id}>
                    {brand.title}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="w-1/2 flex flex-col relative">
            <label htmlFor="price-filter" className="text-sm">
              Стоимость
            </label>
            <div className="absolute bottom-4 flex w-full justify-between text-sm">
              <div>{priceRange?.minPrice} руб.</div>
              <div>{priceRange?.maxPrice} руб.</div>
            </div>
            <Range
              step={1}
              min={priceRange?.minPrice}
              max={priceRange?.maxPrice}
              values={[filters.minPrice]}
              onChange={setRangeEventMinPrice}
              onFinalChange={changeFilterMinPrice}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  className="h-0.5 w-full bg-gray-400 rounded mt-1"
                  style={props.style}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => {
                const {key, ...otherProps} = props;

                return (
                    <div
                      key={key}
                      {...otherProps}
                      className="relative h-1.5 w-2.5 bg-slate-600 -translate-y-1/2 shadow-md outline-0
                                 after:absolute after:top-full after:border-x-5 after:border-b-0 
                                 after:border-t-5 after:border-transparent after:border-t-slate-600"
                    />
                  )
              }}
            ></Range>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <label htmlFor="input" className="bg-gray-300 text-center py-3 cursor-pointer">Импорт</label>
        <input id="input" type="file" className="hidden" accept=".xlsx" onChange={sendExcel}/>
        <Link href={Route.Cart} onClick={redirectToCart} style={ButtonStyle.Green} className="text-center">Выбрано: {cartItemsCount}</Link>
      </div>
    </header>
  );
};

export default CatalogHeader;
