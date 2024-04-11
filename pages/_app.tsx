import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta  name="viewport" content="initial-scale=1.0, user-scalable=no" />
        <title>대양ING</title>
      </Head>
      <Script
        type="text/javascript"
        strategy="beforeInteractive"
        src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=6kbpgfbf8d"
      ></Script>
      <Component {...pageProps} />
    </>
  )
}
