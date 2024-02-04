'use client'


import Link from 'next/link'
import React from 'react'
import { useSession } from 'next-auth/react';

export default function NavbarMain() {

    const { data: session } = useSession();
  return (
    <div className='w-full bg-[#6B5DC0] h-[60px] flex items-center'>
        <nav className='px-[12px] md:px-12 text-white py-2 flex justify-between items-center w-full'>
         
         {/**LOGO HERE */}
           <div>
              ReThink
           </div>

           {session? 
             <h1>{session.user?.name}</h1>
             : 
             <Link href={'/login'} className='text-md md:text-[20px]' >Log in</Link>
           }
        </nav>
    </div>
  )
}
