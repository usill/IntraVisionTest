


export function checkPriceText(price: number): string {
    const strPrice: string = price.toString();

    if(strPrice.length > 2) {
        price = +strPrice.slice(strPrice.length - 2, strPrice.length);
    }
    
    switch(price) {
        case 1:
            return "рубль"
        case 2: 
        case 3: 
        case 4:
            return "рубля"
        default:
            return "рублей"
    }
}