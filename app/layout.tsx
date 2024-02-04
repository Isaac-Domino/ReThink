import NextThemeProvider from "@/components/next-theme-provider"
import SessionProvider from '@/components/SessionProvider';
import { Rubik } from "next/font/google"
import './globals.css'
import './typography.css'

const rubik = Rubik({
    subsets: ['latin'],
    display: "auto" 
  })
  
export default function RootLayout({ children } : {children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
        <body className={rubik.className}> 
          <NextThemeProvider>
           <SessionProvider>     
              {children}        
           </SessionProvider>  
          </NextThemeProvider>     
         </body>  
   
    </html>
  )
}