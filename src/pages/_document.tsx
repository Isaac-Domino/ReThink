import { Html, Head, Main, NextScript } from 'next/document'
import dynamic from 'next/dynamic'


const DynamicHeader = dynamic(() => import('@/components/document'), {
  ssr: false,
})
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
