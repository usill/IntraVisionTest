'use client'

import { ButtonStyle } from "@/shared/UI/Button/ButtonDictionary";
import Link from "@/shared/UI/Link";

interface Props {
    message: string
};

const PaymentErrorMessage: React.FC<Props> = ({message}) => {

    return (
        <section className="container mx-auto">
            <div className="flex flex-col gap-8 items-center">
                <div>{message}</div>
                <div>
                    <Link href="/catalog" style={ButtonStyle.Yellow} className="px-8">Каталог напитков</Link>
                </div>
            </div>
        </section>
    )
}

export default PaymentErrorMessage;