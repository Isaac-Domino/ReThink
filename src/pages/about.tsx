'use client'

import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import NavbarMain from '@/components/navbar-main'
import StickyNavbar from '@/components/stickyNavbar'
import { aboutContent } from '@/lib/about'
import React from 'react'



export default function about() {
  return (
    <div className='min-h-screen pb-[55px] relative w-full bg-gradient-to-tl to-violet-600 from-purple-100'>
       <div className='w-full pt-[14px] px-2 sm:px-8 md:px-[60px] py-4 lg:px-[90px]'>
         <Navbar />
          {/**HOW TO USE */}
          {aboutContent.map((item) => (
             <div key={item.id} className='mx-auto mt-[55px] max-w-[700px] leading-5 text-white flex items-center flex-col gap-8 px-auto '>
                <h1>{item.title}</h1>
  
                <div className='border-gray-200 border rounded-lg shadow-md shadow-violet-400 w-auto px-4 py-2 min-h-auto'>
                    <p className='text-ellipsis md:text-[22px] leading-8'>{item.desc}</p>
                </div>
             </div>   
          ))  
          }   
       </div>
    </div>
  )
}
