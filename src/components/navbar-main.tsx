import { UserButton, currentUser, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

export default function NavbarMain() {

    const { user, isLoaded } = useUser();
  return (
    <div className='w-full bg-[#6B5DC0] h-[60px] flex items-center'>
        <nav className='px-[12px] md:px-12 text-white py-2 flex justify-between items-center w-full'>
         
         {/**LOGO HERE */}
           <div>
              ReThink
           </div>
  
           <div className='flex items-center justify-between gap-6'>
           <Link href={'/'} className='text-md md:text-[20px]'>Home</Link>
           {user && isLoaded? <UserButton /> : 
             <Link href={'/login'} className='text-md md:text-[20px]' >Log in</Link>
           }  
          </div>  
        </nav>
    </div>
  )
}
