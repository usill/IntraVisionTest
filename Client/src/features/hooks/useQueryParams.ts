'use client'
import { useSearchParams } from "next/navigation";

export function useQueryParams() {
    const searchParams = useSearchParams();

    function setQueryParam(
        key: string,
        value: string,
        removeOther: boolean = false
      ) {
        let params = new URLSearchParams(searchParams.toString());
      
        if (removeOther) {
          params = new URLSearchParams();
        }
      
        params.set(key, value);
        window.history.pushState(null, "", `?${params.toString()}`);
      }
      
      function getQueryParam(key: string): string | null {
          const params = new URLSearchParams(searchParams.toString());
      
          return params.get(key);
      }

    return {
        setQueryParam,
        getQueryParam,
    }
}


