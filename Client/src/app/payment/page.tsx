import ReduxProvider from "@/shared/ReduxProvider";
import PaymentHandler from "@/widgets/handlers/PaymentHandler";
import "../globals.css";

export default function Home() {

    return (
        <ReduxProvider>
            <PaymentHandler></PaymentHandler>
        </ReduxProvider>
    )
}