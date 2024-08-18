import "@/styles/globals.css";
import type { AppProps } from "next/app";

import SessionWrapper from "./components/SessionWrapper";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionWrapper>
      <Component {...pageProps} />
    </SessionWrapper>
  )
}
