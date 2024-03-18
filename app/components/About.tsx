import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import React from 'react'
import { motion, Variants } from "framer-motion";


const aboutContent = [
    {
        id: 1,
        title: 'How does it work?',
        desc: "After uploading the document, you can ask anything and AI takes that part. Analyzing the contents within the document and releasing the generated result of the answer from your question.",
    },
     
    {
        id: 2,
        title: 'How it is useful?',
        desc: "The feature is useful for deep scanning large pdf files and much more convenient for working with a bunch of pages manually, as well as for getting more insights into a particular topic."
    },
    {
        id: 3,
        title: "Why ReThink?",
        desc: `ReThink offers seamless integrations, enhanced productivity, accessibility, and continuous improvement. 
        It combines document scanning and AI chat answering into one platform, streamlining tasks and eliminating the need for multiple tools. 
        By digitizing documents, ReThink boosts productivity, providing instant access to information and enabling users to focus on value-added activities. 
        With accessibility across devices, users can leverage ReThink anywhere, anytime. 
        Moreover, as an AI-driven platform, ReThink continuously learns and improves from user interactions, ensuring cutting-edge capabilities and staying at the forefront of technological innovation.`
      }
]


const itemVariants: Variants = {
  offscreen: {
    y: 400
  },
  onscreen: {
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 1
    }
  }
};

export default function About() {
  return (
    <div>
        <div className="w-full pt-[14px] px-2 sm:px-8 md:px-[60px] py-4 lg:px-[90px]">  
        {/**HOW TO USE */}
        <h2 className='my-[55px] text-primaryColor mx-auto text-center font-medium text-[28px] md:text-[35px]'>
           About ReThink
        </h2>
        {aboutContent.map((item) => (
          <motion.div 
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
            key={item.id}
            className="mx-auto mt-[30px] min-w-[200px] max-w-[740px] leading-5 flex items-center flex-col gap-4 px-auto "
          >
          {
          <motion.div 
           className='w-full h-full'  
           variants={itemVariants}>
            <Accordion type="single" collapsible className={`w-full text-secondaryColor`} >
              <AccordionItem value={item.id.toString()}>
                <AccordionTrigger>
                   <span className='text-secondaryColor text-[20px] md:text-[27px]'>{item.title}</span>
                  </AccordionTrigger>

                <AccordionContent>
                   <span className='md:text-[18px] font-light text-gray-600'>{item.desc}</span>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div> 
          }
          </motion.div>
        ))}
      </div>
    </div>
  )
}