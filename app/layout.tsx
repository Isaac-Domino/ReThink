import NextThemeProvider from "@/components/next-theme-provider"
import { ClerkProvider } from "@clerk/nextjs"
import { Rubik } from "next/font/google"
import '@/styles/globals.css'
import '@/styles/typography.css'
import ReactQueryProvider from "../providers/QueryProvider"
import { EdgeStoreProvider } from "./lib/edgestore"
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from "./api/uploadthing/core"
import { Toaster } from "sonner"

/**DEFAULT FONT */
const rubik = Rubik({
  subsets: ['latin'],
  display: "auto"
})

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
     <ClerkProvider> 
        <html lang="en" suppressHydrationWarning>
            <body className={rubik.className}>
              <ReactQueryProvider>
                 <NextThemeProvider>     
                    <NextSSRPlugin
                     routerConfig={extractRouterConfig(ourFileRouter)}
                     />
                           {children}
                          <Toaster 
                            position="top-center"
                            closeButton={true}
                          />
                 </NextThemeProvider>
               </ReactQueryProvider> 
            </body> 
        </html>
     </ClerkProvider> 
    )
  }