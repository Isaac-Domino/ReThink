import "@/styles/globals.css";
import "@/styles/typography.css";

import type { AppProps } from "next/app";
import NextThemeProvider from "@/components/next-theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import { Rubik } from "next/font/google";
import Footer from "@/components/footer";

import { Toaster } from "sonner";

/**DEFAULT FONT */
const rubik = Rubik({
  subsets: ["latin"],
  display: "auto",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={rubik.className}>
      <ClerkProvider
        appearance={{
          elements: {
            footer: "hidden",
          },
        }}
      >
        <NextThemeProvider>
           
               <Component {...pageProps} />
                   <Toaster 
                        position="top-center"
                        closeButton={true}
                      />
          <Footer />
        </NextThemeProvider>
      </ClerkProvider>
    </main>
  );
}
