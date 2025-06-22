import { Brand } from "@/entities/Brand";

export async function fetchBrands(): Promise<Brand[]> {
    const url = process.env.NEXT_PUBLIC_CATALOG_API;

    if(!url) {
        console.error("Путь до сервера не найден");
        return [];
    }

    const fullUrl = url + "/brand/all";
    const response = await fetch(fullUrl, { method: "GET" });

    if(response.ok) {
       return await response.json(); 
    }
    
    if(response.status == 500) {
        console.error("Ошибка сервера");
    }

    return [];
}