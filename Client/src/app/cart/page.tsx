
import "../globals.css";
import ReduxProvider from "@/shared/ReduxProvider";
import CartHandler from "@/widgets/handlers/CartHandler";

export default function Home() {
  return (
    <ReduxProvider>
      <CartHandler/>
    </ReduxProvider>
  );
}
