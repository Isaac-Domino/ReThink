'use client'

import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import NavbarMain from '@/components/navbar-main'
import StickyNavbar from '@/components/stickyNavbar'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { aboutContent } from '@/lib/about'
import React from 'react'
import { useInView } from 'react-intersection-observer'



export default function about() {
   // eslint-disable-next-line react-hooks/rules-of-hooks
   const { inView, ref } = useInView({
      threshold: 0,
    });
  
  return (
   
    <div className="min-h-screen pb-[55px]  w-full relative bg-gradient-to-tr from-[#7f7886] to-violet-400">
         <div className='sticky w-full px-[60px] z-50 h-16 bg-[#705FAC]  top-0 '>
           <Navbar />
         </div>
       <div className="w-full pt-[14px] px-2 sm:px-8 md:px-[60px] py-4 lg:px-[90px]">
        
        {/**HOW TO USE */}
        <h1 className='my-[55px] text-white mx-auto text-center font-medium text-[28px] md:text-[35px]'>
           About ReThink
        </h1>
        {aboutContent.map((item) => (
          <div
            key={item.id}
            className="mx-auto mt-[55px] min-w-[200px] max-w-[700px] leading-5 text-white flex items-center flex-col gap-8 px-auto "
          >
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value={item.id.toString()}>
                <AccordionTrigger>
                   <span className='text-purple-100 md:text-[25px]'>{item.title}</span>
                  </AccordionTrigger>

                <AccordionContent>
                   <span className='md:text-[16px]'>{item.desc}</span>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>


     <div className='hidden absolute bottom-0 md:block opacity-45'>
      <div className='w-[70px] h-[70px] 
       bg-gradient-to-tr from-violet-500 to-purple-300 
       shadow-lg absolute bottom-6 left-4 rounded-full '>
      </div>

      <div className='w-[70px] h-[70px] 
       bg-gradient-to-tr from-violet-500 to-purple-300 
       shadow-lg absolute bottom-20 left-4 rounded-full '>
      </div>

      <div className='w-[70px] h-[70px] 
       bg-gradient-to-tr from-violet-500 to-purple-300 
       shadow-lg absolute bottom-28 left-4 rounded-full '>
      </div>
     </div>

     <div className='hidden absolute top-8 right-0 md:block opacity-45'>
      <div className='w-[70px] h-[70px] 
       bg-gradient-to-tr from-violet-500 to-purple-300 
       shadow-lg absolute top-6 right-4 rounded-full '>
      </div>

      <div className='w-[70px] h-[70px] 
       bg-gradient-to-tr from-violet-500 to-purple-300 
       shadow-lg absolute top-20 right-4 rounded-full '>
      </div>

      <div className='w-[70px] h-[70px]
       bg-gradient-to-tr from-violet-500 to-purple-300 
       shadow-lg  absolute top-28 right-4 rounded-full '>
      </div>
     </div>

    </div>
  );
}


function accordion() {
   return (
   <Accordion type="single" collapsible className="w-full">
       <AccordionItem value="item-1">
         <AccordionTrigger>
            Is it accessible?
         </AccordionTrigger>

         <AccordionContent>
           Yes. It adheres to the WAI-ARIA design pattern.
         </AccordionContent>
       </AccordionItem>

       <AccordionItem value="item-2">
         <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
           Yes. It comes with default styles that matches the other
           components&apos; aesthetic.
         </AccordionContent>
       </AccordionItem>
       
       <AccordionItem value="item-3">
         <AccordionTrigger>Is it animated?</AccordionTrigger>
         <AccordionContent>
           Yes. It`s animated by default, but you can disable it if you prefer.
         </AccordionContent>
       </AccordionItem>
     </Accordion>
   );
}
