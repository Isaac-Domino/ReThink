import "@/styles/globals.css";
import "@/styles/typography.css";

import type { AppProps } from "next/app";
import NextThemeProvider from "@/components/next-theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ClerkProvider>
        <NextThemeProvider defaultTheme="light">
          <Navbar />
          <Component {...pageProps} />
        </NextThemeProvider>
      </ClerkProvider>
    </>
  );
}
