'use client'

import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from 'next/image'
import React, { useRef } from "react";
import { CheckCircle2 } from 'lucide-react';
import { motion, useScroll } from 'framer-motion'
import { useInView } from 'react-intersection-observer';
import Hero from "@/components/Hero";



const features = [
  {
    icon: 
     <CheckCircle2 
         color="white"
         size={32}
         className="bg-secondaryColor text-md  rounded-full"
     />,
    title: 'File conversion',
    description: 'Automatically convert any document file to .pdf',
    image: <Image src={'/upload.svg'} width={40} height={40} alt="upload icon" />

  },
  {
    icon: 
     <CheckCircle2 
         color="white"
         size={32}
         className="bg-secondaryColor text-md  rounded-full"
     />,
    title: 'Chat System',
    description: 'AI-powered Chat for faster and smarter communication',
    image: <Image src={'/Chat icon.svg'} width={40} height={40} alt="chat icon" />

  },
  {
    icon: 
     <CheckCircle2 
         color="white"
         size={32}
         className="bg-secondaryColor text-md  rounded-full"
     />,
    title: 'User Friendly',
    description: 'Simplify and streamline for a hassle-free experience.',
    image: <Image src={'/user-friendly.svg'} width={40} height={40} alt="user friendly icon" />
  },
  {
    icon: 
     <CheckCircle2 
         color="white"
         size={32}
         className="bg-secondaryColor text-md  rounded-full"
     />,
    title: 'Very Responsive',
    description: 'Accurate and quick responses',
    image: <Image src={'/responsive.svg'} width={40} height={40} alt="green frame clock icon" />
  },

]


const Home = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress, } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"]
  });

  const [itemRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });


  /**LANDING PAGE */
  return (
   <motion.div
     initial={{ opacity: 0, }}
     animate={{ opacity: 1, }}
     transition={{ ease: "easeOut", type: "tween"}}
   >
      <main className="w-full z-10 px-2 sm:px-8 md:px-[60px] py-4 lg:px-[90px] min-w-full h-auto min-h-screen relative">
        <div className="">
            <Navbar />
        
        {/**HERO SECTION */}
        <Hero />
          
        <Image 
          src={'/backround gradient.png'}
          alt="background"
          className="absolute h-[550px] sm:h-[500px] object-center bg-center w-full md:h-[700px] top-0 left-0 -z-10"
          quality={100}
          sizes="100vw"
          width={400}
          height={400}
          style={{
            objectFit: 'cover'
          }}
        />
      </div>
 
        {/**SECOND CONTENT */}
        <motion.div
         ref={ref}
         style={{
           opacity: scrollYProgress
         }}
         transition={{ ease: 'linear',  delay: 1, }}
         
        className="w-full mt-[190px] 
        h-[400px] my-auto items-center flex mb-6"
        >
           <div className="flex gap-8 justify-between w-full h-auto items-center">
               <div className="flex-1 h-full">
                  <Image 
                   width={350}
                   height={300}
                   src={'/sammy-line-woman-on-skateboard-with-file-folders.gif'}
                   alt="animated gif"
                  />
               </div>
 
               <div className=" flex-1 w-auto h-auto">
                 <p className="md:text-[30px] text-md leading-normal text-[#2e2b41]">Working with AI to enhance your prompts and for accurate results.</p>
               </div>
           </div>
        </motion.div>


        {/**THIRD CONTENT*/}
        <div className="w-full mt-[20px] md:mt-[120px]">
           <section className="py-[35px] flex flex-col items-center gap-2">
                <h1 className="text-primaryColor text-[25px] md:text-4xl">See features in action</h1>

                <motion.div 
                       initial={{ opacity: .50}}
                       viewport={{ once: true }}
                       whileInView={{ opacity: 1}}
                       transition={{ ease: 'linear', type:"spring", duration: 70, }} className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-[60px] px-[10px] md:p-[20px] lg:px-[30px] justify-around mx-auto grid-rows-2 items-center w-full">
                    {/**MAPPING THE FEATURES HERE */}
               
                   {features.map((item, index) => (
                      <div
                        key={index} className="p-[16px] flex justify-between items-center border-[#A781F5] border h-[90px] rounded-lg">
                    
                       <div className="flex w-[250px] sm:w-[350px] md:w-[500px] max-w-[400px] gap-4 items-center">
                           <div>
                             {item.icon}
                           </div>
                           <div className="flex flex-col">
                              <h3 className="text-[18px] md:text-xl">{item.title}</h3>
                              <span className="font-light text-[13px]  lg:text-[14px]">{item.description}</span>
                           </div>
                       </div>

                       <div>
                          {item.image}
                       </div>
                   </div>
                  ))}
                
                </motion.div>
           </section>
        </div>
    </main>

     <div className="w-full md:px-4 flex h-[400px] sm:h-[420px] lg:h-[500px] bg-[#9A8DCD] mt-[175px]">
        <div className="w-full mt-[25px]">   
          <div className="flex flex-col gap-[20px] items-center mx-auto w-auto ">
            <h1 className="text-white leading-relaxed text-center text-3xl mt-7 lg:text-4xl">Read, Search,<br /> Interact</h1>
            
      
            <div className="flex mt-[25px]  items-center px-2 gap-4 md:gap-6 rounded-md w-auto">
               <Image 
                width={420}
                height={400}
                src={'/Desktop - content.png'}
                alt="preview desktop"
                className="rounded-lg w-[250px] sm:w-[270px] lg:w-[400px] shadow-xl"
                quality={100}
              />

             <Image 
                width={105}
                height={200}
                src={'/Mobile.png'}
                alt="preview mobile"
                className="rounded-lg self-end w-[85px] lg:w-auto shadow-xl"
                quality={100}
              />
            </div>   
            </div>
         </div>
     </div>
  </motion.div> 
  );
};

export default Home;