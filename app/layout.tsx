import NextThemeProvider from "@/components/next-theme-provider"
import { ClerkProvider } from "@clerk/nextjs"
import { Rubik } from "next/font/google"
import '@/styles/globals.css'
import '@/styles/typography.css'
/**DEFAULT FONT */
const rubik = Rubik({
  subsets: ['latin'],
  display: "auto"
})

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
     <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
            <body className={rubik.className}>
            <NextThemeProvider> 
              {children}
            </NextThemeProvider>
            </body>
         
      </html>
     </ClerkProvider> 
    )
  }