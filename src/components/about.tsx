import { aboutContent } from '@/lib/about'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import React from 'react'


export default function About() {
  return (
    <div>
        <div className="w-full pt-[14px] px-2 sm:px-8 md:px-[60px] py-4 lg:px-[90px]">  
        {/**HOW TO USE */}
        <h1 className='my-[55px] text-primaryColor mx-auto text-center font-medium text-[28px] md:text-[40px]'>
           About ReThink
        </h1>
        {aboutContent.map((item) => (
          <div
            key={item.id}
            className="mx-auto mt-[30px] min-w-[200px] max-w-[740px] leading-5 flex items-center flex-col px-auto "
          >
            <Accordion type="single" collapsible className={`w-full text-violet-700`} >
              <AccordionItem value={item.id.toString()}>
                <AccordionTrigger>
                   <span className='text-violet-700 text-[18px] md:text-[25px]'>{item.title}</span>
                  </AccordionTrigger>

                <AccordionContent>
                   <span className='md:text-[16px] font-light text-gray-600'>{item.desc}</span>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  )
}
