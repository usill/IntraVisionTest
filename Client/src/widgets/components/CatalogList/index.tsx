'use client'

import Button from "@/shared/UI/Button";
import { ButtonStyle } from "@/shared/UI/Button/ButtonDictionary";
import Preloader from "@/shared/UI/Preloader";
import { PreloaderType } from "@/shared/UI/Preloader/PreloaderType";
import { RootState } from "@/store";
import { cartAddProduct } from "@/store/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const CatalogList: React.FC = () => {
    const products = useSelector((state: RootState) => state.catalog.productData.products);
    const dispatch = useDispatch();

    const addToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
        const button: HTMLButtonElement = event.target as HTMLButtonElement;
        const product: HTMLDivElement = button.parentElement as HTMLDivElement;
        const productId = product?.dataset['id'];

        if(!productId) {
            return;
        }

        const productInList = products.find(p => p.id == +productId);

        if(!productInList) {
            return;
        }

        dispatch(cartAddProduct(productInList));
    }

    const checkInStock = (inStock: boolean) => {
        if(!inStock) {
            return <Button style={ButtonStyle.Gray} disabled>Закончился</Button>;
        }

        return <Button onClick={addToCart} style={ButtonStyle.Yellow}>Выбрать</Button>;
    }

    return (
        <div className="relative">
            <Preloader type={PreloaderType.Products}/>
            <section className="grid grid-cols-4 gap-4">
            {products?.map(product => {
                return (
                    <div key={product.id} className="flex flex-col gap-4 border border-gray-300 p-8" data-id={product.id}>
                        <img src={product.imageUrl} alt={product.title} className="max-h-[260px] w-max mx-auto"/>
                        <h3 className="text-center text-xl max-w-3/4 mx-auto mt-auto">{product.title}</h3>
                        <div className="text-center">{product.price} руб.</div>
                        {checkInStock(product.inStock)}
                    </div>
                );
            })}
        </section>
        </div>
    );
}

export default CatalogList;