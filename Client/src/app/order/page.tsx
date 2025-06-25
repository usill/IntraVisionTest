import ReduxProvider from "@/shared/ReduxProvider";
import OrderHandler from "@/widgets/handlers/OrderHandler";
import "../globals.css";

export default function Home() {
  return (
    <ReduxProvider>
      <OrderHandler/>
    </ReduxProvider>
  );
}
