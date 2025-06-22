import { Brand } from "@/entities/Brand";
import { FetchProductData } from "@/shared/DTO/FetchProductResult";
import { ProductFilters } from "@/shared/DTO/ProductFilters";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CatalogState {
  brands: Brand[];
  productData: FetchProductData;
  mainPreloaderVisible: boolean;
  productsPreloaderVisible: boolean;
  selectedFilters: ProductFilters
}

const initialState: CatalogState = {
  brands: [],
  productData: {
    priceRange: {
        minPrice: 0,
        maxPrice: 100
    }
  } as FetchProductData,
  selectedFilters: {
    brandId: 0,
    minPrice: 0,
  } as ProductFilters,
  mainPreloaderVisible: true,
  productsPreloaderVisible: true
};

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    setBrands(state, action: PayloadAction<Brand[]>) {
      state.brands = action.payload;
    },
    setProducts(state, action: PayloadAction<FetchProductData>) {
      state.productData = action.payload;
    },
    setMainPreloader(state, action: PayloadAction<boolean>) {
        state.mainPreloaderVisible = action.payload;
    },
    setProductsPreloader(state, action: PayloadAction<boolean>) {
        state.productsPreloaderVisible = action.payload;
    },
    setSelectedBrand(state, action: PayloadAction<number>) {
        state.selectedFilters.brandId = action.payload;
    },
    setSelectedMinPrice(state, action: PayloadAction<number>) {
        state.selectedFilters.minPrice = action.payload;
    }
  },
});

export const { 
    setBrands,
    setProducts,
    setMainPreloader,
    setProductsPreloader,
    setSelectedBrand,
    setSelectedMinPrice
 } = catalogSlice.actions;
export default catalogSlice.reducer;
