import "modern-css-reset";
import "@/styles/globals.css";

import { DataProvider } from "@/providers/DataProvider";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DataProvider>
      <Component {...pageProps} />
    </DataProvider>
  );
}