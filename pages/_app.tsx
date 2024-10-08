import "@/styles/globals.css";
import type { AppProps } from "next/app";


import { SessionProvider } from "next-auth/react"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: any) {
  return (
    <SessionProvider session={session} basePath="/api/auth">
      <Component {...pageProps} />
    </SessionProvider>
  )
}
