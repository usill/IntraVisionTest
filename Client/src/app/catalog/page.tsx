import ReduxProvider from "@/shared/ReduxProvider";
import "../globals.css";
import CatalogHandler from "@/widgets/handlers/CatalogHandler";
import { Suspense } from "react";

export default function Home() {
  return (
    <ReduxProvider>
      <Suspense>
        <CatalogHandler/>
      </Suspense>
    </ReduxProvider>
  );
}
