import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='flex w-full h-screen items-center justify-center gap-4 flex-col'> 
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/" className='p-2 border-1 border dark:border-white'>Return Home</Link>
    </div>
  )
}