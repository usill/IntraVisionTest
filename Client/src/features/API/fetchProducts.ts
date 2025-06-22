import { FetchProductData, FetchProductResult } from "@/shared/DTO/FetchProductResult";

let fetchTimeout: NodeJS.Timeout | null = null;
let fetchCancel: () => void;
const fetchDelay = 750;

const emptyResult: FetchProductResult = {
  data: {} as FetchProductData,
  successed: false,
  status: 0,
};

export async function fetchProducts(): Promise<FetchProductResult> {
  if (fetchTimeout) {
    fetchCancel();
    fetchTimeout = null;
  }

  const fetchPromise = new Promise<FetchProductResult>((resolve) => {
    const searchParams = new URLSearchParams(window.location.search);

    fetchTimeout = setTimeout(async () => {
      let url = process.env.NEXT_PUBLIC_CATALOG_API;
  
      if(!url) {
          console.error("Путь до сервера не найден");
          return [];
      }
  
      url += "/product/list";

      if(searchParams.toString()) {
        url += "?" + searchParams;
      }

      const response = await fetch(url, {
        method: "GET",
      });
  
      fetchTimeout = null;
  
      const products = response.ok ? await response.json() : [];
  
      const result: FetchProductResult = {
        data: products,
        successed: response.ok,
        status: response.status,
      };
  
      resolve(result);
    }, fetchDelay);

    fetchCancel = () => {
      if(fetchTimeout) {
        clearTimeout(fetchTimeout);
      }
      resolve(emptyResult);
    }
  })

  return await fetchPromise;
}
