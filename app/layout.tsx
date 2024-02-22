import NextThemeProvider from "@/components/next-theme-provider"
import { ClerkProvider } from "@clerk/nextjs"
import { Rubik } from "next/font/google"
import '@/styles/globals.css'
import '@/styles/typography.css'
import ReactQueryProvider from "../providers/QueryProvider"
import { EdgeStoreProvider } from "./lib/edgestore"


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
                    <EdgeStoreProvider>
                           {children}
                    </EdgeStoreProvider>
                 </NextThemeProvider>
               </ReactQueryProvider> 
            </body> 
        </html>
     </ClerkProvider> 
    )
  }