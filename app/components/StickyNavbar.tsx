import React from 'react'
import Navbar from './Navbar'

export default function StickyNavbar({ inView }: { inView: boolean}) {
  return ( 
    <div className={`w-full ${inView ? 'hidden' : 'flex '} sticky top-0 z-50 items-center  bg-[#7173b9] h-16 px-2 sm:px-8 md:px-[60px] py-4 lg:px-[90px]`}>
      <Navbar />
   </div>
  )
}